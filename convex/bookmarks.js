import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const toggleBookmark = mutation({
    args: {
        postId: v.string(),
        userIdAuthor: v.string(),
    },
    handler: async(ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        
        const existing = await ctx.db.query('bookmarks').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', args.postId)).first();


        if(existing){
            await ctx.db.delete(existing._id);
            return false
        } else {
            await ctx.db.insert('bookmarks', {
                userId: currentUser._id,
                userIdAuthor: args.userIdAuthor,
                postId: args.postId,
            })
            return true
        }


    }
});

export const getBookmarkedPosts = query({
    handler: async(ctx) => {

        const currentUser = await getAuthenticatedUser(ctx);

        const bookmarks = await ctx.db.query('bookmarks').withIndex('by_user', (q) => q.eq('userId', currentUser._id)).order('desc').collect();

        const bookmarksWithInfo = await Promise.all(
            bookmarks.map(async(bookmark) => {
                const postAuthor = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', bookmark.userIdAuthor)).first();

                const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', bookmark.postId)).first();

                const like = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', bookmark.postId)).first();

                const bookmarked = await ctx.db.query('bookmarks').withIndex('by_user_and_post', (q) => q.eq('userId' ,currentUser._id).eq('postId', bookmark.postId)).first();

                const actualUser = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', currentUser._id)).first();

                console.log({BOOKMARKED: bookmarked})

                
                return {
                    ...post,
                    actualUserPicture: actualUser.image,
                    author: {
                        _id: postAuthor?._id,
                        username: postAuthor?.username,
                        image: postAuthor?.image,
                    },
                    isLiked: !!like,
                    isBookmarked: !!bookmarked,
                };
            })
        );

        return bookmarksWithInfo
    }
})




