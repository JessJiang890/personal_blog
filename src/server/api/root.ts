import { blogRouter } from '@/server/api/routers/blog';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
