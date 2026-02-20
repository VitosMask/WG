'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Bonus = { id: string; title: string; description: string; offerUrl: string; type: 'FREE' | 'PREMIUM'; expiresAt: string };

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);

  useEffect(() => {
    api<Bonus[]>('/bonuses').then(setBonuses).catch(console.error);
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Бонусы</h1>
      {bonuses.map((bonus) => (
        <article key={bonus.id} className="rounded border border-zinc-800 p-4">
          <p className="text-brand">{bonus.title} ({bonus.type})</p>
          <p>{bonus.description}</p>
          <a href={bonus.offerUrl} target="_blank" className="underline">Перейти к офферу</a>
        </article>
      ))}
    </section>
  );
}
