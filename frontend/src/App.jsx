import { useCallback, useEffect, useState } from 'react';
import { getProfile } from './api.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Contact from './components/Contact.jsx';
import { About, Achievements, CodingProfiles, Experience, Projects, Skills } from './components/Sections.jsx';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setError('');
    getProfile()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  // Content arrives async, so the browser can't honour a #hash on first load — do it once rendered.
  useEffect(() => {
    if (profile && window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, [profile]);

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p className="font-mono text-accent">500 // couldn&apos;t reach the API</p>
          <p className="mt-2 text-slate-400">{error}</p>
          <button onClick={load} className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm text-white hover:border-accent/50">
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="caret font-mono text-sm text-slate-500">loading</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience profile={profile} />
        <Projects profile={profile} />
        <CodingProfiles profile={profile} />
        <Achievements profile={profile} />
        <Skills profile={profile} />
        <Contact profile={profile} />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono text-xs">built with React · Express · MongoDB</p>
        </div>
      </footer>
    </>
  );
}
