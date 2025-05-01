import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Notification } from '../../components/Notification'
import { NotificationsHeader } from '../../components/NotificationsHeader'
import { styles } from '../../styles/notifications.styles'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { NoNotificationsFound } from '../../components/NoNotificationsFound'

export default function Notifications() {
  
    const notifications = useQuery(api.notifications.getNotifications);

    if(notifications?.length === 0) return (
      <View style={styles.container}>
        <NotificationsHeader/>
        <NoNotificationsFound/>
      </View>
    )

  return (
   <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({item}) => <Notification notification={item}/>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<NotificationsHeader/>}
      />  
   </View>
  )
}