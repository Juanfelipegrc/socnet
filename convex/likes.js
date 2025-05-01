import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const toggleLike = mutation({
    args: {
        postId: v.string(),
    },
    handler: async(ctx, args) => {
        
        const currentUser = await getAuthenticatedUser(ctx);

        const isLiked = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', args.postId)).first();

        const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

    

        if(isLiked){
            await ctx.db.delete(isLiked._id);
            await ctx.db.patch(args.postId, {
                likes: post.likes - 1
            });
            const postUpdated = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();
            
            const notification = await ctx.db.query('notifications').withIndex('by_receiver_and_post', (q) => q.eq('receiverId', postUpdated.userId).eq('postId', postUpdated._id)).first();


            if(currentUser._id !== postUpdated.userId){
                await ctx.db.delete(notification._id);
            }

            return {
                isLiked: false,
                likesNum: postUpdated.likes
            };
        } else {
            await ctx.db.insert('likes', {userId: currentUser._id, postId: args.postId});
            await ctx.db.patch(args.postId, {
                likes: post.likes + 1
            });

            const postUpdated = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

            if(currentUser._id !== postUpdated.userId){
                await ctx.db.insert('notifications', {
                    receiverId: postUpdated.userId,
                    senderId: currentUser._id,
                    type: 'like',
                    postId: postUpdated._id
                })
            }

            return {
                isLiked: true,
                likesNum: postUpdated.likes
            };
        }
    }
});

export const addLikeWithDoubleTap = mutation({
    args: {
        postId: v.string(),
    },
    handler: async(ctx, args) => {
        
        const currentUser = await getAuthenticatedUser(ctx);

        const isLiked = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', args.postId)).first();

        const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();


           if(isLiked) {
            const postUpdated = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();
            return {
                isLiked: 'repeated like',
                likesNum: postUpdated.likes
            }

           } else {
            await ctx.db.insert('likes', {userId: currentUser._id, postId: args.postId});
            await ctx.db.patch(args.postId, {
                likes: post.likes + 1
            });

            const postUpdated = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

            if(currentUser._id !== postUpdated.userId){
                await ctx.db.insert('notifications', {
                    receiverId: postUpdated.userId,
                    senderId: currentUser._id,
                    type: 'like',
                    postId: postUpdated._id
                })
            }
            
            return {
                isLiked: true,
                likesNum: postUpdated.likes
            };
           }
    }
});

