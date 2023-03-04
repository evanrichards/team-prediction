import { Message } from 'src/types/message';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { MarketUuid } from 'src/types/market';
import { formatTimestamp } from 'src/utils/timestamp';
import Button from 'src/components/Button';

export default function Messenger({
  marketUuid,
}: {
  readonly marketUuid: MarketUuid;
}) {
  const messagesQuery = trpc.message.listForMarket.useQuery(marketUuid);
  const [messages, setMessages] = useState<Message[]>(messagesQuery.data ?? []);
  useEffect(() => {
    setMessages(messagesQuery.data ?? []);
  }, [messagesQuery.data]);

  trpc.message.onNewMessage.useSubscription(undefined, {
    onData(message) {
      setMessages([...messages, message]);
    },
  });

  const postMessageMutation = trpc.message.create.useMutation({
    onSuccess: (message) => {
      setMessages([...messages, message]);
    },
  });

  // Keep scrolled to bottom
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  const [message, setMessage] = useState('');

  return (
    <div className="flex max-w-2xl flex-col border-2">
      <div
        // ref types are messed up
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        className="flex h-64 flex-col overflow-scroll p-3"
      >
        {messages.length === 0 && 'No messages yet...'}
        {messages.map(({ message, userName, createdAt }, i) => {
          return (
            <div
              key={i}
              className="flex flex-row justify-between border-b-2 border-gray-300"
            >
              <div>{message}</div>
              <div className="flex flex-col text-right">
                <div>{userName}</div>
                <div className="text-sm">{formatTimestamp(createdAt)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="flex flex-row gap-5 p-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          onClick={() => {
            if (message === '') {
              return;
            }
            postMessageMutation.mutate({ marketUuid, message });
            setMessage('');
          }}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
