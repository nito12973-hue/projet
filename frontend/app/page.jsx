import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { getProducts } from '@/services/api';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <HeroSection />
      <section className="section-spacing pt-0">
        <div className="container-page">
          <SectionHeading
            eyebrow="Sélection premium"
            title="Les produits les plus populaires du moment"
            description="Cartes élégantes, informations claires et actions rapides pour maximiser la conversion."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </div>
      </section>
    </>
  );
}
