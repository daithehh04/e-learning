import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash";
import { requestLoadCategorys, requestLoadCategoryBySlug } from '../middleware/categoryMiddleware';
const initialState = {
     categorys: [],
     loading: false,
     error: "",
     categoryInfo: null,
     courses: [],
};

export const categorySlice = createSlice({
     name: "category",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          const actionList = [requestLoadCategorys, requestLoadCategoryBySlug];
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
          builder.addCase(
               requestLoadCategorys.fulfilled,
               (
                    state,
                    action
               ) => {
                    state.loading = false;
                    state.categorys = _.orderBy(action.payload.data, ["index"], ["asc"]);
                    console.log(state.categorys);
               }
          );

          // load by slug
          builder.addCase(
               requestLoadCategoryBySlug.fulfilled,
               (
                    state,
                    action
               ) => {
                    state.categoryInfo = action.payload.data.categorys;
                    state.courses = action.payload.data.course;
                    state.loading = false;
               }
          );
     },
});

export default categorySlice.reducer;
