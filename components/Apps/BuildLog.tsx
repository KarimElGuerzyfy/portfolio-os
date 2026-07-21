import type { CaseStudy } from '@/data/caseStudies'

type BuildLogProps = {
  selected: CaseStudy
}

export default function BuildLog({ selected }: BuildLogProps) {
  return (
    <div className="px-10 py-10">
      <div className="max-w-[65ch]">
        <h1 className="text-3xl font-semibold text-text">{selected.title}</h1>
        <p className="mt-3 text-lg text-text-dim leading-snug">{selected.subtitle}</p>

        {selected.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {selected.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs text-text-dim border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-8">
          {selected.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">
                {section.heading}
              </h2>
              <div className="mt-2 text-sm leading-relaxed text-text-dim">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
