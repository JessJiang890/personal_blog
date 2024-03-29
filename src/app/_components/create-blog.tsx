'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '@/trpc/react';
import Button from './button';

export function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = api.blog.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle('');
      setContent('');
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, content });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? 'Posting...' : 'Post'}
        </button>
        <Button
          href="/"
          className="mb-2"
        >
          Back
        </Button>
      </form>
    </>
  );
}
