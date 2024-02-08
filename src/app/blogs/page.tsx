import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { api } from '@/trpc/server';

export default async function ViewAllBlogs() {
  noStore();
  const allBlogs = await api.blog.getAll.query();
  return (
    <div className="w-full max-w-xs">
      <div className="mb-px">
        <h2 className="text-lg font-bold">All Blogs</h2>
        {allBlogs.length > 0 ? (
          <ul>
            {allBlogs.map((blog) => (
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
