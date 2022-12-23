"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
/**
 * This file contains the root router of your tRPC-backend
 */
const trpc_1 = require("../trpc");
const post_1 = require("./post");
exports.appRouter = (0, trpc_1.router)({
    healthcheck: trpc_1.publicProcedure.query(() => 'yay!'),
    post: post_1.postRouter,
});
