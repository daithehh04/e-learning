import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoadQuestionsByTopic } from "../../api/topic";
export const requestLoadQuestionsByIdTopic = createAsyncThunk(
     "question/requestLoadQuestionsByIdTopic",
     async (props) => {
          const res = await apiLoadQuestionsByTopic(props);
          return res.data;
     }
);