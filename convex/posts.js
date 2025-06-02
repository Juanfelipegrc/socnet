import { v } from "convex/values";
import { mutation, query } from "./_generated/server"
import { getAuthenticatedUser } from "./users"




export const generateUploadUrl = mutation({
    handler: async(ctx) => {
        const res = await getAuthenticatedUser(ctx);

        if(!res){
            throw new Error('Unauthorized');
        }
        return ctx.storage.generateUploadUrl();
    }
})


export const createPost =  mutation({
    args: {
        caption: v.optional(v.string()),
        storageId: v.id('_storage'),
    },
    handler: async(ctx, args) => {


        const currentUser = await getAuthenticatedUser(ctx);


        const imageUrl = await ctx.storage.getUrl(args.storageId);

        if(!imageUrl) {
            throw new Error('Image not found');
        };

        const postId = await ctx.db.insert('posts', {
            userId: currentUser._id,
            imageUrl,
            comments: 0,
            likes: 0,
            storageId: args.storageId,
            caption: args.caption,
        });

        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1,

        });

        return postId;
    }

});




export const getFeedPosts = query({
    handler: async(ctx) => {

    
        const currentUser = await getAuthenticatedUser(ctx);

      
        const posts = await ctx.db.query('posts').order('desc').collect();

        if(currentUser === 'no-user') return {
            posts: [],
            problem: 'no-user'
        }
        if(posts.length === 0) return {
            posts: [],
            problem: ''
        }

        const postWithInfo = await Promise.all(
            
            posts?.map(async(post) => {
                const postAuthor = await ctx.db.get(post.userId);

                const like = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', post._id)).first();

                const bookmark = await ctx.db.query('bookmarks').withIndex('by_user_and_post', (q) => q.eq('userId' ,currentUser._id).eq('postId', post._id)).first();

                const actualUser = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', currentUser._id)).first();



                
                return {
                    ...post,
                    actualUserPicture: actualUser.image,
                    author: {
                        _id: postAuthor?._id,
                        username: postAuthor?.username,
                        image: postAuthor?.image,
                    },
                    isLiked: !!like,
                    isBookmarked: !!bookmark,
                };

            }),
        );


        

            return {
                posts: postWithInfo,
                problem: ''
            }

    }
})



export const getIndividualPost = query({
    args: {
        postId: v.string(),
    },
    handler: async(ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', args.postId)).first();

        const postAuthor = await ctx.db.get(post.userId);

        const like = await ctx.db.query('likes').withIndex('by_user_and_post', (q) => q.eq('userId', currentUser._id).eq('postId', post._id)).first();

        const bookmark = await ctx.db.query('bookmarks').withIndex('by_user_and_post', (q) => q.eq('userId' ,currentUser._id).eq('postId', post._id)).first();

        const actualUser = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', currentUser._id)).first();

        return {
            ...post,
            actualUserPicture: actualUser.image,
            author: {
                _id: postAuthor?._id,
                username: postAuthor?.username,
                image: postAuthor?.image,
            },
            isLiked: !!like,
            isBookmarked: !!bookmark,
        }
    }
})
