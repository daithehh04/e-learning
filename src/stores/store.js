import { configureStore } from '@reduxjs/toolkit';
import topicReducer from './slices/topicSlice';
import courseReducer from './slices/courseSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    topic: topicReducer,
    course: courseReducer,
    user: userReducer,
  },
});