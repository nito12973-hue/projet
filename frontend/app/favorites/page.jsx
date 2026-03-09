import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { getProducts } from '@/services/api';

export default async function FavoritesPage() {
  const products = await getProducts();

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow="Favoris"
          title="Produits sauvegardés par l’utilisateur"
          description="La base de données gère les favoris utilisateur via le profil sécurisé."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 3).map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
