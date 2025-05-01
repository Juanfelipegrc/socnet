import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const createComment = mutation({
    args: {
        postId: v.string(),
        content: v.string(),
    },
    handler: async(ctx, args) => {
        
        const currentUser = await getAuthenticatedUser(ctx);

        await ctx.db.insert('comments', {
            userId: currentUser._id, 
            postId: args.postId,
            content: args.content,
        });

        const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

        await ctx.db.patch(args.postId, {
            comments: post.comments + 1,
        })




    }
})