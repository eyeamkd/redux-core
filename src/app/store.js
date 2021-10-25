import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/userSlice';
import notificationReducer from '../features/notifications/notificationSlice'; 

export default configureStore({
  reducer:{
    posts:postsReducer,
    users: userReducer,
    notifications: notificationReducer
  }
})
