import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoadCourseBySlug } from '../../api/course';

export const requestLoadCourseBySlug = createAsyncThunk(
  'course/requestLoadCourseBySlug',
  async (props) => {
    const res = await apiLoadCourseBySlug(props);
    return res.data;
  }
);
