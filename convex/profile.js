import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";



export const getActualUser = query({
    handler: async(ctx) => {

        try {
            if(ctx === undefined) return;
            const currentUser = await getAuthenticatedUser(ctx);


            return currentUser
        } catch (error) {
            console.log(error)
        }
    }
});


export const getUserById = query({
    args: {
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        const user = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', args.userId)).first();

        return {
            ...user,
        }
    }
})

export const getPostsByUser = query({
    args: {
        userId: v.string(),
    },
    handler: async(ctx, args) => {

  


        const posts = await ctx.db.query('posts').withIndex('by_user', (q) => q.eq('userId', args.userId)).order('desc').collect();

        const postsWithInfo = await Promise.all(
            posts?.map(async(post) => {

                const postAuthor = await ctx.db.get(post.userId);


                
                const like = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', args.userId).eq('postId', post._id)).first();

                const bookmark = await ctx.db.query('bookmarks').withIndex('by_user_and_post', (q) => q.eq('userId' ,args.userId).eq('postId', post._id)).first();

                const actualUser = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', args.userId)).first();

                return {
                    ...post,
                    actualUserPicture: actualUser.image,
                    author: {
                        _id: postAuthor?._id,
                        username: postAuthor?.username,
                        image: postAuthor?.image,
                    },
                    isLiked: !!like,
                    isBookmarked: !!bookmark
                }
            })
        );


        return postsWithInfo;
    }
});


export const validateIsFollowing = query({
    args: {
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const isFollowing = await ctx.db.query('follows').withIndex('by_both', (q) => q.eq('followerId', currentUser?._id).eq('followingId', args.userId)).first();

        
        if(isFollowing){
            return true;
        } else {
            return false;
        }
    }
})

export const toggleFollowUser = mutation({
    args: {
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        

        const userToFollow = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', args.userId)).first();

        const isFollowing = await ctx.db.query('follows').withIndex('by_both', (q) => q.eq('followerId', currentUser?._id).eq('followingId', args.userId)).first();

        const thereIsNotificaiton = await ctx.db.query('notifications').withIndex('by_receiver_sender_and_type', (q) => q.eq('receiverId', args.userId).eq('senderId', currentUser?._id).eq('type', 'follow')).first();

        if(isFollowing){

            await ctx.db.delete(isFollowing?._id);
            await ctx.db.delete(thereIsNotificaiton?._id);
            await ctx.db.patch(args.userId, {
                followers: userToFollow.followers - 1,
            })
            await ctx.db.patch(currentUser?._id, {
                following: currentUser?.following - 1,
            })

            return false;
        } else {
            await ctx.db.insert('follows', {
                followingId: args.userId,
                followerId: currentUser?._id,
            });
            await ctx.db.insert('notifications', {
                receiverId: args.userId,
                senderId: currentUser._id,
                type: 'follow',
            })
            await ctx.db.patch(args.userId, {
                followers: userToFollow.followers + 1,
            })
            await ctx.db.patch(currentUser?._id, {
                following: currentUser?.following + 1,
            })
            return true;
        }
    }
})