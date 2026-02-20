'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Profile = {
  username: string;
  bio?: string;
  avatarUrl?: string;
  _count: { followers: number; following: number };
  posts: Array<{ id: string; content: string }>;
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    api<Profile>(`/users/${params.id}`).then(setProfile).catch(console.error);
  }, [params.id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl">@{profile.username}</h1>
      <p>{profile.bio}</p>
      <p className="text-sm text-zinc-400">Подписчики: {profile._count.followers} · Подписки: {profile._count.following}</p>
      <button className="rounded bg-brand px-4 py-2">Подписаться / отписаться</button>
      <div className="space-y-2">
        {profile.posts.map((post) => (
          <div key={post.id} className="rounded border border-zinc-800 p-3">{post.content}</div>
        ))}
      </div>
    </section>
  );
}
