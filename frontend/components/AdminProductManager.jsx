'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { slugify } from '@/lib/commerce';
import { createCategory, createProduct, deleteProduct, updateProduct, uploadProductImage } from '@/services/api';

const initialForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: '',
  newCategory: '',
  image: null
};

export default function AdminProductManager({ initialProducts, initialCategories }) {
  const { locale, messages } = useLanguage();
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingProductId, setEditingProductId] = useState('');
  const t = messages.adminProductManager;

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const resetForm = () => {
    setForm(initialForm);
    setEditingProductId('');
  };

  const startEdit = (product) => {
    setEditingProductId(product._id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: String(product.price ?? ''),
      stock: String(product.stock ?? ''),
      categoryId: product.category?._id || '',
      newCategory: '',
      image: null
    });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      await deleteProduct(productId);
      setProducts((current) => current.filter((product) => product._id !== productId));
      if (editingProductId === productId) resetForm();
      toast.success(t.deleted);
    } catch (error) {
      toast.error(error.message || t.deleteFailed);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editingProductId && !form.image) return toast.error(t.missingImage);
    if (!form.categoryId && !form.newCategory.trim()) return toast.error(t.missingCategory);

    setSubmitting(true);
    try {
      let categoryId = form.categoryId;

      if (!categoryId) {
        const name = form.newCategory.trim();
        const slug = slugify(name);
        if (!slug) throw new Error(t.invalidCategoryName);

        const categoryResponse = await createCategory({ name, slug });
        categoryId = categoryResponse.category._id;
        setCategories((current) => [...current, categoryResponse.category].sort((a, b) => a.name.localeCompare(b.name, locale)));
      }

      let image = products.find((product) => product._id === editingProductId)?.image;
      if (form.image) {
        const uploadResponse = await uploadProductImage(form.image);
        image = uploadResponse.imageUrl;
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image,
        category: categoryId
      };

      const productResponse = editingProductId
        ? await updateProduct(editingProductId, payload)
        : await createProduct(payload);

      setProducts((current) => {
        if (editingProductId) {
          return current.map((product) => (product._id === editingProductId ? productResponse.product : product));
        }
        return [productResponse.product, ...current];
      });
      resetForm();
      toast.success(editingProductId ? t.updated : t.created);
    } catch (error) {
      toast.error(error.message || t.saveFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="glass-panel p-5 sm:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">{editingProductId ? t.editTitle : t.newTitle}</h3>
            <p className="text-sm text-slate-500">{t.description}</p>
          </div>
          <p className="text-xs text-slate-500">{t.adminNote}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input required className="input-field" placeholder={t.productName} value={form.name} onChange={(e) => updateField('name', e.target.value)} />
          <select className="input-field" value={form.categoryId} onChange={(e) => updateField('categoryId', e.target.value)}>
            <option value="">{t.existingCategory}</option>
            {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
          </select>
          <input className="input-field" placeholder={t.newCategory} value={form.newCategory} onChange={(e) => updateField('newCategory', e.target.value)} />
          <input required min="0" step="1" type="number" className="input-field" placeholder={t.price} value={form.price} onChange={(e) => updateField('price', e.target.value)} />
          <input required min="0" step="1" type="number" className="input-field" placeholder={t.stock} value={form.stock} onChange={(e) => updateField('stock', e.target.value)} />
          <label className="input-field flex cursor-pointer items-center justify-between gap-3">
            <span className="truncate text-sm text-slate-500">{form.image?.name || (editingProductId ? t.uploadExisting : t.uploadNew)}</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">{t.uploadButton}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => updateField('image', e.target.files?.[0] || null)} />
          </label>
          <textarea required className="input-field md:col-span-2" placeholder={t.descriptionPlaceholder} rows={4} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button disabled={submitting} className="btn-primary w-full sm:w-auto">{submitting ? t.saving : editingProductId ? t.updateProduct : t.saveProduct}</button>
          {editingProductId ? <button type="button" onClick={resetForm} className="btn-secondary w-full justify-center sm:w-auto">{t.cancelEdit}</button> : null}
        </div>
      </form>

      {products.length === 0 ? (
        <div className="glass-panel p-6 text-center sm:p-8">
          <h4 className="text-xl font-black">{t.emptyTitle}</h4>
          <p className="mt-3 text-slate-500">{t.emptyDescription}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="space-y-3">
              <ProductCard product={product} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => startEdit(product)} className="btn-secondary flex-1 justify-center">{t.edit}</button>
                <button type="button" onClick={() => handleDelete(product._id)} className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600">{t.delete}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}