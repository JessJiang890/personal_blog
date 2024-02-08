import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { CreateBlog } from '@/app/_components/create-blog';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CrudShowcase />
      </div>
    </main>
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
