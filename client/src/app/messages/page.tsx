'use client';

import { FormEvent, useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export default function MessagesPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.connect();
    socket.emit('messages:join', 'demo-room');
    socket.on('messages:new', (payload) => {
      setMessages((current) => [...current, payload.content]);
    });
    return () => {
      socket.off('messages:new');
      socket.disconnect();
    };
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('messages:send', { conversationId: 'demo-room', message: { content: text } });
    setText('');
  };

  return (
    <section>
      <h1 className="text-2xl">Сообщения</h1>
      <div className="my-4 space-y-2">{messages.map((msg, idx) => <p key={idx}>{msg}</p>)}</div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input className="flex-1 rounded bg-zinc-800 p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="rounded bg-brand px-4">Send</button>
      </form>
    </section>
  );
}
