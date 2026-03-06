import { useState, useEffect } from 'react';

interface Props {
  slug: string;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function PostReactions({ slug }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === '1');

    fetch(`/api/stats/${slug}`)
      .then((r) => r.json())
      .then((data: { views: number; likes: number }) => {
        setViews(data.views);
        setLikes(data.likes);
      })
      .catch(() => {});

    // Record view once per session
    if (!sessionStorage.getItem(`viewed:${slug}`)) {
      sessionStorage.setItem(`viewed:${slug}`, '1');
      fetch(`/api/views/${slug}`, { method: 'POST' })
        .then((r) => r.json())
        .then((data: { views: number }) => setViews(data.views))
        .catch(() => {});
    }
  }, [slug]);

  async function handleLike() {
    if (liked || liking) return;
    setLiking(true);
    try {
      const r = await fetch(`/api/likes/${slug}`, { method: 'POST' });
      const data: { likes: number } = await r.json();
      setLikes(data.likes);
      setLiked(true);
      localStorage.setItem(`liked:${slug}`, '1');
    } catch {}
    setLiking(false);
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.25rem 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      margin: '2rem 0 1.5rem',
    }}>
      {/* Heart / like button */}
      <button
        onClick={handleLike}
        disabled={liked || liking}
        aria-label={liked ? 'Already liked' : 'Like this post'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.875rem',
          borderRadius: '6px',
          border: `1px solid ${liked ? 'var(--accent)' : 'var(--border)'}`,
          background: liked
            ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
            : 'var(--bg-elevated)',
          color: liked ? 'var(--accent)' : 'var(--text-muted)',
          cursor: liked ? 'default' : 'pointer',
          transition: 'border-color 0.15s, color 0.15s, background 0.15s',
        }}
        onMouseEnter={(e) => {
          if (liked) return;
          const el = e.currentTarget;
          el.style.borderColor = 'var(--accent)';
          el.style.color = 'var(--accent)';
          el.style.background = 'color-mix(in srgb, var(--accent) 8%, transparent)';
        }}
        onMouseLeave={(e) => {
          if (liked) return;
          const el = e.currentTarget;
          el.style.borderColor = 'var(--border)';
          el.style.color = 'var(--text-muted)';
          el.style.background = 'var(--bg-elevated)';
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.15s',
            transform: liking ? 'scale(1.25)' : 'scale(1)',
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 600,
          minWidth: '2ch',
        }}>
          {likes === null ? '—' : formatCount(likes)}
        </span>
      </button>

      {/* View count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-faint)',
      }}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 500,
        }}>
          {views === null ? '—' : formatCount(views)}
        </span>
      </div>
    </div>
  );
}
