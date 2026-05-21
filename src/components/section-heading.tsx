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
    <div className="mb-6 grid gap-3 md:mb-8 md:grid-cols-[112px_1fr] md:items-end">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.68rem] text-coral">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-coral/50 to-transparent" />
      </div>
      <div className="space-y-2">
        <p className="eyebrow">{label}</p>
        <h2 className="max-w-4xl text-[1.8rem] font-semibold leading-tight text-ink sm:text-[2.25rem]">
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
