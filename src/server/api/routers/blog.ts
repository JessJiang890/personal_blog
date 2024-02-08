import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';

export const blogRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.blog.create({
        data: {
          title: input.title,
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.blog.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),

  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.blog.findMany({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  findById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const blog = await ctx.db.blog.findUnique({
      where: { id: input.id },
    });

    if (!blog) {
      throw new Error('Post not found');
    }

    return blog;
  }),

  editById: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingBlog = await ctx.db.blog.findFirst({
        where: {
          id: input.id,
          createdBy: { id: ctx.session.user.id },
        },
      });
      if (!existingBlog) {
        throw new Error('Post not found or you do not have permission to edit it');
      }
      return ctx.db.blog.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
