import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoadCategoryBySlug, apiLoadCategorys } from '../../api/category';
export const requestLoadCategorys = createAsyncThunk(
  'category/loadCategorys',
  async (props) => {
    const res = await apiLoadCategorys(props);
    return res.data;
  }
);

export const requestLoadCategoryBySlug = createAsyncThunk(
  'category/requestLoadCategoryBySlug',
  async (props) => {
    const res = await apiLoadCategoryBySlug(props);
    return res.data;
  }
);
