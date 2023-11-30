import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  requestLoadTopicByCourse,
  requestLoadTopicById,
  requestLoadTotalLearnedTopic,
  requestUpdateTopicById,
} from '../middleware/topicMiddleware';

// Define a type for the slice state
const initialState = {
  loading: false,
  error: '',
  topics: [],
  topicInfo: null,
  total: 0,
  totalLearned: 0,
};
export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [
      requestLoadTopicByCourse,
      requestLoadTopicById,
      requestUpdateTopicById,
    ];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });
    actionList.forEach((action) => {
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    // load topic by id Course
    builder.addCase(requestLoadTopicByCourse.fulfilled, (state, action) => {
      state.topics = _.orderBy(action.payload.data, ['index'], ['asc']).map(
        (topic) => {
          return {
            ...topic,
            topicChildData:
              _.orderBy(topic.topicChildData, ['index'], ['asc']),
          };
        }
      );
      state.total = action.payload.total;
      state.loading = false;
    });

    // load topic by id
    builder.addCase(requestLoadTopicById.fulfilled, (state, action) => {
      state.topicInfo = action.payload;
      console.log(state.topicInfo, action.payload, "slice topic");
      state.loading = false;
    });

    // load total learned topic
    builder.addCase(requestLoadTotalLearnedTopic.fulfilled, (state, action) => {
      state.totalLearned = action.payload.totalLearned;
    });

    // update topic
    builder.addCase(requestUpdateTopicById.fulfilled, (state, action) => {
      state.topicInfo = action.payload.data;
    });
  },
});
export const {} = topicSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const topicState = (state) => state.topic;

export default topicSlice.reducer;
