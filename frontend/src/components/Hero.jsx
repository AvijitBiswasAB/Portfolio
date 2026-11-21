import { BrandIcon, ExternalLink } from './ui.jsx';

export default function Hero({ profile }) {
  const { name, headline, tagline, stats, socials, education, resumeUrl } = profile;
  const current = education[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-40">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1 font-mono text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent" />
            {current.degree.split(' (')[0]} · {current.short}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{name}</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-accent sm:text-base">{headline}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-line px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/50"
            >
              Get in touch
            </a>
            {resumeUrl && (
              <ExternalLink
                href={resumeUrl}
                className="rounded-xl border border-line px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/50"
              >
                Résumé
              </ExternalLink>
            )}
            {socials.github && (
              <ExternalLink
                href={socials.github}
                className="grid h-[46px] w-[46px] place-items-center rounded-xl border border-line text-slate-300 transition hover:border-accent/50 hover:text-white"
              >
                <BrandIcon name="github" />
                <span className="sr-only">GitHub</span>
              </ExternalLink>
            )}
            {socials.linkedin && (
              <ExternalLink
                href={socials.linkedin}
                className="grid h-[46px] w-[46px] place-items-center rounded-xl border border-line text-slate-300 transition hover:border-accent/50 hover:text-white"
              >
                <BrandIcon name="linkedin" />
                <span className="sr-only">LinkedIn</span>
              </ExternalLink>
            )}
          </div>
        </div>

        <TerminalCard stats={stats} />
      </div>
    </section>
  );
}

function TerminalCard({ stats }) {
  return (
    <div className="card overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">stats.cpp</span>
      </div>
      <div className="p-5 font-mono text-sm">
        <p className="text-slate-500">
          <span className="text-accent-2">$</span> ./stats --all
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-ink/60 p-4">
              <dt className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-white">
                {s.value}
                {s.note && <span className="ml-1.5 text-xs font-medium text-accent">{s.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <p className="caret mt-4 text-slate-500">
          <span className="text-accent-2">$</span> while(true) solve();
        </p>
      </div>
    </div>
  );
}
