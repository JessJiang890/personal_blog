import { unstable_noStore as noStore } from 'next/cache';

import { CreateBlog } from '@/app/_components/create-blog';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export default async function Home() {
  noStore();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <CrudShowcase />
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestBlog = await api.blog.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestBlog ? (
        <p className="truncate">Your most recent post: {latestBlog.content}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreateBlog />
    </div>
  );
}
