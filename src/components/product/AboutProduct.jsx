export function AboutProduct({ description }) {
  if (!description?.full && !description?.short) return null;

  return (
    <section>
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6">
        ABOUT PRODUCT
      </h2>
      <div className="prose prose-neutral max-w-none text-lg text-neutral-700 leading-relaxed">
        <p>
          {description.full || description.short}
        </p>
      </div>
    </section>
  );
}
