export interface PostCardProps {
  id: string;
  content: string;
  imageUrl?: string;
  voiceUrl?: string;
  author: { username: string };
  _count: { likes: number; comments: number; reposts: number };
  viewsCount: number;
}

export const PostCard = ({ content, author, imageUrl, voiceUrl, _count, viewsCount }: PostCardProps) => (
  <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
    <p className="text-sm text-brand">@{author.username}</p>
    <p className="mt-2">{content}</p>
    {imageUrl ? <img src={imageUrl} alt="post" className="mt-3 rounded" /> : null}
    {voiceUrl ? <audio controls className="mt-3 w-full" src={voiceUrl} /> : null}
    <div className="mt-3 flex gap-4 text-xs text-zinc-400">
      <span>❤️ {_count.likes}</span>
      <span>💬 {_count.comments}</span>
      <span>🔁 {_count.reposts}</span>
      <span>👀 {viewsCount}</span>
    </div>
  </article>
);
