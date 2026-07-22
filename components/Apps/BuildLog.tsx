import type { CaseStudy } from '@/data/caseStudies'

type BuildLogProps = {
  selected: CaseStudy
}

export default function BuildLog({ selected }: BuildLogProps) {
  return (
    <div className="px-10 py-10">
      <div className="max-w-[65ch]">
        <h1 className="text-[28px] font-semibold tracking-tight text-white">{selected.title}</h1>
        <p className="mt-3 text-[15px] text-text-dim">{selected.subtitle}</p>

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

        <div>
          {selected.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mt-8 mb-3 text-[19px] font-semibold text-white">
                {section.heading}
              </h2>
              <div
                className="space-y-4 text-[15px] leading-relaxed text-text-body [&_strong]:font-semibold [&_strong]:text-white [&_em]:italic [&_code]:bg-white/8 [&_code]:rounded-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:font-mono [&_code]:text-white/85 [&_a]:text-accent [&_a]:no-underline [&_a]:hover:underline"
              >
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
