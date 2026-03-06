import { useState, useEffect, useRef, useCallback } from 'react';

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const scriptLoaded = useRef(false);
  const cssLoaded = useRef(false);

  const loadAssets = useCallback(() => {
    if (!cssLoaded.current) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(css);
      cssLoaded.current = true;
    }

    if (scriptLoaded.current) return Promise.resolve(true);

    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.onload = () => { scriptLoaded.current = true; resolve(true); };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }, []);

  const openSearch = useCallback(async () => {
    await loadAssets();
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, [loadAssets]);

  const closeSearch = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Initialize PagefindUI after modal renders (new div each open)
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById('pagefind-search');
    if (!el) return;

    if ((window as any).PagefindUI) {
      new (window as any).PagefindUI({
        element: '#pagefind-search',
        showImages: false,
        resetStyles: false,
        excerptLength: 100,
      });
    } else {
      el.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:2rem">
        Search requires a production build — run <code style="font-family:var(--font-mono);background:var(--bg-elevated);padding:.2em .4em;border-radius:4px">pnpm build</code> first.
      </p>`;
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openSearch, closeSearch]);

  return (
    <>
      <button
        onClick={openSearch}
        aria-label="Search"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-sans)',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span>Search</span>
        <kbd style={{
          marginLeft: '0.25rem',
          padding: '0.1em 0.4em',
          fontSize: '0.7rem',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
        }}>⌘K</kbd>
      </button>

      {open && (
        <div
          onClick={closeSearch}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '5rem',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              margin: '0 1rem',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1rem',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <div id="pagefind-search" />
          </div>
        </div>
      )}
    </>
  );
}
