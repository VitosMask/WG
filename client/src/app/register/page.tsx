'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', username: '', password: '' });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await api<{ token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(form) });
    localStorage.setItem('token', result.token);
    router.push('/feed');
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <h1 className="text-2xl">Register</h1>
      <input className="w-full rounded bg-zinc-800 p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded bg-zinc-800 p-2" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className="w-full rounded bg-zinc-800 p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="rounded bg-brand px-4 py-2">Create account</button>
    </form>
  );
}
