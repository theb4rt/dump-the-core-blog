import { useState, useEffect } from 'react';

interface Props {
  slug: string;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function PostCardStats({ slug }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === '1');
    fetch(`/api/stats/${slug}`)
      .then((r) => r.json())
      .then((data: { views: number; likes: number }) => {
        setViews(data.views);
        setLikes(data.likes);
      })
      .catch(() => {});
  }, [slug]);

  // Render nothing until loaded (no layout shift)
  if (views === null && likes === null) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      paddingTop: '0.5rem',
      marginTop: '0.5rem',
      borderTop: '1px solid var(--border)',
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.275rem',
        color: liked ? 'var(--accent)' : 'var(--text-faint)',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {likes === null ? '—' : formatCount(likes)}
      </span>

      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.275rem',
        color: 'var(--text-faint)',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {views === null ? '—' : formatCount(views)}
      </span>
    </div>
  );
}
