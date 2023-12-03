import { createSlice } from "@reduxjs/toolkit";
const initialState = {
     isShow: false,
}
export const chatgptSlice = createSlice({
     name: 'chatgpt',
     initialState,
     reducers: {
          toggle: (state, action) => {
               console.log(1);
               state.isShow = action.payload;
               console.log(state.isShow, 222222)
          }

     }
});

export default chatgptSlice.reducer;