import { createSlice } from '@reduxjs/toolkit';
import { requestLoadQuestionsByIdTopic } from '../middleware/questionsMiddeware';
const initialState = {
  loading: false,
  error: '',
  questions: [],
  total: 0,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestLoadQuestionsByIdTopic];
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

    // load questions by id topic
    builder.addCase(
      requestLoadQuestionsByIdTopic.fulfilled,
      (state, action) => {
        state.questions = action.payload.data;
        state.total = action.payload.total;
        state.loading = false;
      }
    );
  },
});

export const {} = questionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const QuestionState = (state) => state.question;

export default questionSlice.reducer;
