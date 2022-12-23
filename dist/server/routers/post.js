"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
const prisma_1 = require("../prisma");
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
// In a real app, you'd probably use Redis or something
exports.postRouter = (0, trpc_1.router)({
    add: trpc_1.authedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().uuid().optional(),
        text: zod_1.z.string().min(1),
    }))
        .mutation(async ({ input, ctx }) => {
        const { name } = ctx.user;
        const post = await prisma_1.prisma.post.create({
            data: {
                ...input,
                name,
                source: 'GITHUB',
            },
        });
        return post;
    }),
    infinite: trpc_1.publicProcedure
        .input(zod_1.z.object({
        cursor: zod_1.z.date().nullish(),
        take: zod_1.z.number().min(1).max(50).nullish(),
    }))
        .query(async ({ input }) => {
        var _a;
        const take = (_a = input.take) !== null && _a !== void 0 ? _a : 10;
        const cursor = input.cursor;
        const page = await prisma_1.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            cursor: cursor ? { createdAt: cursor } : undefined,
            take: take + 1,
            skip: 0,
        });
        const items = page.reverse();
        let prevCursor = null;
        if (items.length > take) {
            const prev = items.shift();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            prevCursor = prev.createdAt;
        }
        return {
            items,
            prevCursor,
        };
    }),
});
