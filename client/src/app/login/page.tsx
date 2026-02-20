'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await api<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', result.token);
    router.push('/feed');
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <h1 className="text-2xl">Login</h1>
      <input className="w-full rounded bg-zinc-800 p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full rounded bg-zinc-800 p-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button className="rounded bg-brand px-4 py-2">Sign in</button>
    </form>
  );
}
