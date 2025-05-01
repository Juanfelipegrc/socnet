import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";



export const getActualUser = query({
    handler: async(ctx) => {

        try {
            if(ctx === undefined) return;
            console.log('SE EJECUTAAAAAAAAAAAAAA')
            const currentUser = await getAuthenticatedUser(ctx);

            console.log({CURRENTUSERFROMACTUAL:currentUser})

            return currentUser
        } catch (error) {
            console.log(error)
        }
    }
});



export const getPostByCurrentUser = query({
    handler: async(ctx) => {

        const currentUser = await getAuthenticatedUser(ctx);



        const posts = await ctx.db.query('posts').withIndex('by_user', (q) => q.eq('userId', currentUser._id)).order('desc').collect();

        const postsWithInfo = await Promise.all(
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
                    isBookmarked: !!bookmark
                }
            })
        );

        return postsWithInfo;
    }
})