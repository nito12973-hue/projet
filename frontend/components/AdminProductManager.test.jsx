'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AdminProductManager from '@/components/AdminProductManager';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  createCategory: vi.fn(),
  createProduct: vi.fn(),
  deleteProduct: vi.fn(),
  updateProduct: vi.fn(),
  uploadProductImage: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
  confirm: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('sonner', () => ({
  toast: {
    success: (...args) => mocks.toastSuccess(...args),
    error: (...args) => mocks.toastError(...args)
  }
}));

vi.mock('@/services/api', () => ({
  createCategory: (...args) => mocks.createCategory(...args),
  createProduct: (...args) => mocks.createProduct(...args),
  deleteProduct: (...args) => mocks.deleteProduct(...args),
  updateProduct: (...args) => mocks.updateProduct(...args),
  uploadProductImage: (...args) => mocks.uploadProductImage(...args)
}));

vi.mock('@/components/ProductCard', () => ({
  default: ({ product }) => <article data-testid="product-card">{product.name}</article>
}));

function renderManager(props, locale = 'en') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <AdminProductManager {...props} />
    </LanguageProvider>
  );
}

describe('AdminProductManager', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.createCategory.mockReset();
    mocks.createProduct.mockReset();
    mocks.deleteProduct.mockReset();
    mocks.updateProduct.mockReset();
    mocks.uploadProductImage.mockReset();
    mocks.toastSuccess.mockClear();
    mocks.toastError.mockClear();
    mocks.confirm.mockReset();
    window.confirm = mocks.confirm;
  });

  it('creates a product with uploaded image and existing category', async () => {
    const user = userEvent.setup();
    const file = new File(['image'], 'phone.png', { type: 'image/png' });

    mocks.uploadProductImage.mockResolvedValue({ imageUrl: 'https://cdn.example.com/phone.png' });
    mocks.createProduct.mockResolvedValue({
      product: {
        _id: 'p1',
        name: 'Galaxy A55',
        description: 'Great phone',
        price: 125000,
        stock: 8,
        image: 'https://cdn.example.com/phone.png',
        category: { _id: 'c1', name: 'Phones' }
      }
    });

    renderManager({
      initialProducts: [],
      initialCategories: [{ _id: 'c1', name: 'Phones' }]
    });

    await user.type(screen.getByPlaceholderText('Product name'), 'Galaxy A55');
    await user.selectOptions(screen.getByRole('combobox'), 'c1');
    await user.type(screen.getByPlaceholderText('Price in XOF'), '125000');
    await user.type(screen.getByPlaceholderText('Available stock'), '8');
    await user.type(screen.getByPlaceholderText('Product description'), 'Great phone');
    await user.upload(screen.getByLabelText(/choose a product image/i), file);
    await user.click(screen.getByRole('button', { name: 'Save product' }));

    await waitFor(() => {
      expect(mocks.uploadProductImage).toHaveBeenCalled();
      expect(mocks.createProduct).toHaveBeenCalledWith({
        name: 'Galaxy A55',
        description: 'Great phone',
        price: 125000,
        stock: 8,
        image: 'https://cdn.example.com/phone.png',
        category: 'c1'
      });
    });

    expect(mocks.toastSuccess).toHaveBeenCalledWith('Product created successfully.');
    expect(screen.getByText('Galaxy A55')).toBeInTheDocument();
  });

  it('deletes a product after confirmation', async () => {
    const user = userEvent.setup();
    mocks.confirm.mockReturnValue(true);
    mocks.deleteProduct.mockResolvedValue({});

    renderManager({
      initialProducts: [
        {
          _id: 'p1',
          name: 'Laptop Pro',
          description: 'Powerful laptop',
          price: 450000,
          stock: 3,
          image: '/laptop.jpg',
          category: { _id: 'c1', name: 'Computers' }
        }
      ],
      initialCategories: [{ _id: 'c1', name: 'Computers' }]
    });

    expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(mocks.confirm).toHaveBeenCalledWith('Delete this product from the catalog?');
      expect(mocks.deleteProduct).toHaveBeenCalledWith('p1');
    });

    expect(mocks.toastSuccess).toHaveBeenCalledWith('Product deleted.');
    expect(screen.queryByText('Laptop Pro')).not.toBeInTheDocument();
  });
});