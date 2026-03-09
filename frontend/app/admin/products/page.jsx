import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { getProducts } from '@/services/api';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Gestion produits" title="Ajouter, modifier et supprimer les produits" description="Le backend expose des routes sécurisées pour gérer le catalogue, les images Cloudinary et le stock." />
      <div className="glass-panel p-6">
        <h3 className="text-xl font-black">Nouveau produit</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="Nom du produit" />
          <input className="input-field" placeholder="Catégorie" />
          <input className="input-field" placeholder="Prix" />
          <input className="input-field" placeholder="Stock" />
          <textarea className="input-field md:col-span-2" placeholder="Description du produit" rows={4} />
        </div>
        <button className="btn-primary mt-6">Enregistrer le produit</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}
