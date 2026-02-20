'use client';

import { useEffect, useState } from 'react';
import { StreamCard } from '@/components/stream-card';
import { api } from '@/lib/api';
import { socket } from '@/lib/socket';

type Stream = { id: string; title: string; platformUrl: string; viewersCount: number; user: { username: string } };

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    api<Stream[]>('/streams').then(setStreams).catch(console.error);
    socket.connect();
    socket.on('stream:updated', (updated: Stream) => {
      setStreams((current) => current.map((stream) => (stream.id === updated.id ? updated : stream)));
    });
    return () => {
      socket.off('stream:updated');
      socket.disconnect();
    };
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl">Стримеры</h1>
      {streams.map((stream) => <StreamCard key={stream.id} {...stream} />)}
    </section>
  );
}
