interface StreamCardProps {
  title: string;
  platformUrl: string;
  viewersCount: number;
  user: { username: string };
}

export const StreamCard = ({ title, platformUrl, viewersCount, user }: StreamCardProps) => (
  <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
    <p className="text-brand">{title}</p>
    <p className="text-sm text-zinc-400">Стример: @{user.username}</p>
    <p className="text-sm">Онлайн: {viewersCount}</p>
    <a className="mt-2 inline-block text-xs underline" href={platformUrl} target="_blank">
      Смотреть стрим
    </a>
  </article>
);
