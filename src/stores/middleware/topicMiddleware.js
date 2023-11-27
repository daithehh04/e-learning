import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetTotalLearnedTopic,
  apiLoadTopicByCourse,
  apiLoadTopicById,
  apiUpdateTopic,
} from '../../api/topic';

export const requestLoadTopicByCourse = createAsyncThunk(
  'topic/requestLoadTopicByCourse',
  async (props) => {
    const res = await apiLoadTopicByCourse(props);
    return res.data;
  }
);

export const requestLoadTopicById = createAsyncThunk(
  'topic/requestLoadTopicById',
  async (props) => {
    const res = await apiLoadTopicById(props);
    return res.data;
  }
);

export const requestLoadTotalLearnedTopic = createAsyncThunk(
  'topic/requestLoadLearnedTopic',
  async (props) => {
    const res = await apiGetTotalLearnedTopic(props);
    return res.data;
  }
);

export const requestUpdateTopicById = createAsyncThunk(
  'topic/requestUpdateTopicById',
  async (props) => {
    const res = await apiUpdateTopic(props);
    return res.data;
  }
);
