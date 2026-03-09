import ProductBrowser from '@/components/ProductBrowser';
import SectionHeading from '@/components/SectionHeading';
import { getCategories, getProducts } from '@/services/api';

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow="Catalogue"
          title="Recherche intelligente, filtres dynamiques et pagination"
          description="Une expérience responsive inspirée des plus grandes plateformes de vente en ligne."
        />
        <ProductBrowser products={products} categories={categories} />
      </div>
    </section>
  );
}
