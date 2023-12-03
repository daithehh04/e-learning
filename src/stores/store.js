import { configureStore } from '@reduxjs/toolkit';
import topicReducer from './slices/topicSlice';
import courseReducer from './slices/courseSlice';
import userReducer from './slices/userSlice';
import questionsReducer from './slices/questionsSlice';
import categorysReducer from './slices/categorySlice';
import chatgptReducer from './slices/chatgptSlice';

export const store = configureStore({
  reducer: {
    topic: topicReducer,
    course: courseReducer,
    user: userReducer,
    questions: questionsReducer,
    categorys: categorysReducer,
    chatGPT: chatgptReducer
  },
});
