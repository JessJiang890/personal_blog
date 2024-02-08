import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import Button from './_components/button';

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Personal <span className="text-[hsl(280,100%,70%)]">Blog</span>
      </h1>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Hello, {session.user?.name}</span>}
          </p>
          <Button href={session ? '/api/auth/signout' : '/api/auth/signin'}>
            {session ? 'Sign out' : 'Sign in'}
          </Button>
          <Button href="/blogs">View All Blogs</Button>

          {session ? (
            <>
              {' '}
              <Button href="/myblogs">View My Blogs</Button>
              <Button href={'create-post'}>Create Post</Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
