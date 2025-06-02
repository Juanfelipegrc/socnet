import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const createComment = mutation({
    args: {
        postId: v.string(),
        comment: v.string(),
    },
    handler: async(ctx, args) => {
        
        const currentUser = await getAuthenticatedUser(ctx);

        await ctx.db.insert('comments', {
            comment: args.comment,
            userId: currentUser._id, 
            postId: args.postId,
        });

        const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

        await ctx.db.patch(args.postId, {
            comments: post.comments + 1,
        })




    }
});


export const getComments = query({
    args: {
        postId: v.string(),
    },
    handler: async(ctx, args) => {
        
        const comments = await ctx.db.query('comments').withIndex('by_post', (q) => q.eq("postId", args.postId)).order('desc').collect();

        const commentsWithInfo = await Promise.all(
            comments?.map(async(comment) => {
                const author = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', comment.userId)).first();


                return {
                    ...comment,
                    authorPicture: author.image,
                    authorUsername: author.username,
                }

            })
        );

        return commentsWithInfo;
    }
})