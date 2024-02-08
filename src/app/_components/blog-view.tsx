'use client';

import { api } from '@/trpc/react';
import Button from './button';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}
export default function ViewBlog({ params }: Props) {
  const { id } = params;
  const blog = api.blog.findById.useQuery({ id });

  return (
    <>
      <Button
        className="mb-2.5"
        href={'/'}
      >
        Back
      </Button>
      <div>Title: {blog.data?.title}</div>
      <div>Content: {blog.data?.content}</div>
      <div>CreatedBy: {blog.data?.userId}</div>
    </>
  );
}
