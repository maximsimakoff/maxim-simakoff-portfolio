type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="mb-9 grid gap-4 md:mb-12 md:grid-cols-[168px_1fr] md:items-end">
      <div className="flex items-center gap-4">
        <span className="eyebrow whitespace-nowrap">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
      </div>
      <div className="space-y-2.5">
        <p className="eyebrow">{label}</p>
        <h2 className="max-w-4xl font-serif text-[2rem] leading-tight text-ink sm:text-[2.45rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-stone-400 sm:text-[0.98rem] sm:leading-7">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
