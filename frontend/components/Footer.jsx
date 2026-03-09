export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container-page flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 VentePro. Expérience e-commerce moderne, sécurisée et rapide.</p>
        <div className="flex gap-4">
          <span>Next.js</span>
          <span>Express</span>
          <span>MongoDB Atlas</span>
          <span>Cloudinary</span>
        </div>
      </div>
    </footer>
  );
}
