import { useEffect, useRef } from 'react';

interface Props {
  lang: 'en' | 'es';
}

const GISCUS_REPO        = 'theb4rt/dump-the-core-blog';
const GISCUS_REPO_ID     = 'R_kgDORf0wsw';
const GISCUS_CATEGORY    = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_kwDORf0ws84C3zNM';

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark_dimmed';
}

export default function GiscusComments({ lang }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', getTheme());
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    container.appendChild(script);

    // Watch for site theme changes and sync to giscus iframe
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: getTheme() } } },
          'https://giscus.app'
        );
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-faint)',
        marginBottom: '1.25rem',
      }}>
        {lang === 'es' ? 'Comentarios' : 'Comments'}
      </h2>
      <div ref={containerRef} />
    </div>
  );
}
