'use client';

import { useEffect, useState } from 'react';
import { PostCard, PostCardProps } from '@/components/post-card';
import { api } from '@/lib/api';

export default function FeedPage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  const load = async (nextCursor?: string) => {
    const query = new URLSearchParams({ sort: 'new' });
    if (nextCursor) query.set('cursor', nextCursor);
    const chunk = await api<PostCardProps[]>(`/feed?${query.toString()}`);
    setPosts((current) => [...current, ...chunk]);
    setCursor(chunk.length ? chunk[chunk.length - 1].id : null);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Лента</h1>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
      {cursor ? (
        <button className="rounded bg-brand px-4 py-2" onClick={() => load(cursor)}>
          Загрузить еще
        </button>
      ) : null}
    </section>
  );
}
