import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/server/auth';

export default async function ViewMyBlogs() {
  noStore();
  const session = await getServerAuthSession();
  const myBlogs = session?.user ? await api.blog.getAllByUser.query() : [];
  return (
    <div className="w-full max-w-xs">
      <div className="mb-4">
        <h2 className="text-lg font-bold">My Blogs</h2>
        {myBlogs.length > 0 ? (
          <ul>
            {myBlogs.map((blog) => (
              <li
                key={blog.id + blog.title}
                className="border-b border-gray-200 py-2"
              >
                <Link href={`blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts to show.</p>
        )}
      </div>
    </div>
  );
}
