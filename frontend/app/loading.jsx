import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <section className="section-spacing">
      <div className="container-page grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
      </div>
    </section>
  );
}
