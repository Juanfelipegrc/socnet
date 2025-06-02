import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const getNotifications = query({
    handler: async(ctx) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const notifications = await ctx.db.query('notifications').withIndex('by_receiver', (q) => q.eq('receiverId', currentUser._id)).order('desc').collect();

        const notificationsWithInfo = await Promise.all(

            notifications?.map(async(notification) => {
                const sender = await ctx.db.query('users').withIndex('by_id', (q) => q.eq('_id', notification.senderId)).first();

                let post = null;

                if(notification.type === 'like'){
                    post = await ctx.db.query('posts').withIndex('by_id', (q) => q.eq('_id', notification.postId)).first();

                }

                return {
                    ...notification,
                    senderImage: sender.image,
                    senderUsername: sender.username,
                    postImage: post?.imageUrl
                }
            })
        );

        return notificationsWithInfo;
    }
})