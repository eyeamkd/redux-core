import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../users/userSlice'
import { fetchNotifications, getAllNotifications } from './notificationSlice'

function NotificationList() {
  const notifications = useSelector(getAllNotifications)
  const users = useSelector(state=>state.users.users) 
  console.log("users")
 console.log("Notifications are ", notifications);
  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }
    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationList
