import Link from 'next/link';

export const Nav = () => (
  <nav className="flex gap-4 border-b border-zinc-800 px-6 py-4 text-sm">
    <Link href="/feed">Лента</Link>
    <Link href="/bonuses">Бонусы</Link>
    <Link href="/streams">Стримы</Link>
    <Link href="/messages">Сообщения</Link>
  </nav>
);
