import { createSlice } from '@reduxjs/toolkit';
import { requestLoadCourseBySlug } from '../middleware/courseMiddleware';

// Define the initial state using that type
const initialState = {
  loading: false,
  error: '',
  course: null,
  topics: [],
};

export const courseSlice = createSlice({
  name: 'course',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestLoadCourseBySlug];
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

    // load by slug
    builder.addCase(requestLoadCourseBySlug.fulfilled, (state, action) => {
      state.course = action.payload.data;
      state.loading = false;
    });
  },
});

export const {} = courseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const courseState = (state) => state.course;

export default courseSlice.reducer;
