import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-spacing">
      <div className="container-page max-w-2xl text-center">
        <div className="glass-panel p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">404</p>
          <h1 className="mt-4 text-4xl font-black">Page introuvable</h1>
          <p className="mt-4 text-slate-500">Le contenu demandé n’existe pas ou a été déplacé.</p>
          <Link href="/" className="btn-primary mt-8">Retour à l’accueil</Link>
        </div>
      </div>
    </section>
  );
}
