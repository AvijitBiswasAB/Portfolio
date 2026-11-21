import { ArrowIcon, ExternalLink, Reveal, Section } from './ui.jsx';

export function About({ profile }) {
  return (
    <Section id="about" eyebrow="01. about" title="Education">
      <div className="grid gap-5 md:grid-cols-2">
        {profile.education.map((e, i) => (
          <Reveal key={e.school} delay={i * 80} className="card card-hover p-6">
            <p className="font-mono text-xs text-accent">{e.period}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{e.school}</h3>
            <p className="mt-3 text-slate-300">{e.degree}</p>
            <p className="text-sm text-slate-400">{e.field}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience({ profile }) {
  return (
    <Section id="experience" eyebrow="02. experience" title="Where I've worked">
      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
        {profile.experience.map((x, i) => (
          <Reveal as="li" key={x.role} delay={i * 80} className="relative">
            <span className="absolute top-2 -left-[31px] h-3 w-3 rounded-full border-2 border-accent bg-ink sm:-left-[39px]" />
            <div className="card card-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {x.role} <span className="text-accent">@ {x.org}</span>
                </h3>
                <span className="chip">{x.type}</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-3 text-slate-400">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {x.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Projects({ profile }) {
  return (
    <Section id="projects" eyebrow="03. projects" title="Things I've built">
      <div className="grid gap-6 lg:grid-cols-2">
        {profile.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="card card-hover group flex flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold text-white">{p.name}</h3>
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent/70" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              </svg>
            </div>
            <p className="mt-3 text-slate-300">{p.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="font-mono text-accent">›</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-4 pt-6">
              {p.links.map((l) => (
                <ExternalLink
                  key={l.url}
                  href={l.url}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  {l.label} <ArrowIcon />
                </ExternalLink>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function CodingProfiles({ profile }) {
  return (
    <Section id="competitive" eyebrow="04. competitive programming" title="4,000+ problems and counting">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.codingProfiles.map((c, i) => (
          <Reveal key={c.platform} delay={i * 60}>
            <ExternalLink
              href={c.url}
              className="card card-hover group relative block h-full overflow-hidden p-6"
            >
              <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: c.color }} />
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{c.platform}</h3>
                <ArrowIcon className="h-4 w-4 text-slate-500 transition group-hover:text-accent" />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-500">@{c.handle}</p>
              <div className="mt-5 flex items-baseline gap-2">
                {c.rating && <span className="text-3xl font-bold text-white">{c.rating}</span>}
                {c.rank && (
                  <span className={c.rating ? 'text-sm font-medium' : 'text-2xl font-bold'} style={{ color: c.color }}>
                    {c.rank}
                  </span>
                )}
              </div>
              {c.rating && <p className="text-xs text-slate-500">max rating</p>}
              {c.highlights.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm text-slate-400">
                  {c.highlights.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              )}
            </ExternalLink>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Achievements({ profile }) {
  return (
    <Section id="achievements" eyebrow="05. achievements" title="Highlights">
      <ul className="grid gap-4 sm:grid-cols-2">
        {profile.achievements.map((a, i) => (
          <Reveal as="li" key={a.title} delay={(i % 2) * 60} className="card card-hover flex gap-4 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-white">
                {a.url ? (
                  <ExternalLink href={a.url} className="inline-flex items-center gap-1 hover:text-accent">
                    {a.title} <ArrowIcon />
                  </ExternalLink>
                ) : (
                  a.title
                )}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function Skills({ profile }) {
  return (
    <Section id="skills" eyebrow="06. skills" title="Toolbox">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 60} className="card p-6">
            <h3 className="font-mono text-sm text-accent">{g.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-lg border border-line bg-ink/60 px-3 py-1.5 text-sm text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
