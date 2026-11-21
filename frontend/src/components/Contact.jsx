import { useState } from 'react';
import { sendMessage } from '../api.js';
import { BrandIcon, ExternalLink, Reveal, Section } from './ui.jsx';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await sendMessage(form);
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setError(err.message);
      setFieldErrors(err.fields || {});
    }
  }

  const { socials, email } = profile;

  return (
    <Section id="contact" eyebrow="07. contact" title="Let's work together">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-5">
          <p className="text-lg leading-relaxed text-slate-400">
            Open to internships, research collaborations and interesting engineering problems. Drop a message
            and I&apos;ll get back to you.
          </p>
          <div className="space-y-3">
            {email && (
              <a href={`mailto:${email}`} className="block font-mono text-accent hover:underline">
                {email}
              </a>
            )}
            {socials.github && (
              <ExternalLink href={socials.github} className="flex items-center gap-3 text-slate-300 hover:text-white">
                <BrandIcon name="github" /> github.com/BiswasAvijit
              </ExternalLink>
            )}
            {socials.linkedin && (
              <ExternalLink href={socials.linkedin} className="flex items-center gap-3 text-slate-300 hover:text-white">
                <BrandIcon name="linkedin" /> LinkedIn
              </ExternalLink>
            )}
          </div>
        </Reveal>

        <Reveal delay={80}>
          {status === 'sent' ? (
            <div className="card grid min-h-80 place-items-center p-8 text-center" role="status">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Message sent!</h3>
                <p className="mt-2 text-slate-400">Thanks for reaching out — I&apos;ll reply soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-medium text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card space-y-4 p-6" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" value={form.name} onChange={update} error={fieldErrors.name} required autoComplete="name" />
                <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={fieldErrors.email} required autoComplete="email" />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={update} error={fieldErrors.subject} />
              <Field label="Message" name="message" value={form.message} onChange={update} error={fieldErrors.message} required textarea />

              {/* honeypot — hidden from humans */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={update}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {status === 'error' && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, name, error, textarea, required, ...props }) {
  const id = `f-${name}`;
  const cls = `mt-1.5 w-full rounded-xl border bg-ink/70 px-4 py-3 text-white placeholder-slate-600 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
    error ? 'border-red-500/60' : 'border-line'
  }`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={5} className={cls} aria-invalid={!!error} {...props} />
      ) : (
        <input id={id} name={name} className={cls} aria-invalid={!!error} {...props} />
      )}
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
