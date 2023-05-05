import { createSlice } from "@reduxjs/toolkit";

export enum HomeTab {
  recommend = "recommend",
  new = "new",
  star = "star",
}

interface HomeState {
  tab: HomeTab;
}

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    tab: HomeTab.recommend,
  },
  reducers: {
    changeTag: (
      state: HomeState,
      action: { type: string; payload: HomeTab }
    ) => {
      console.log(`切换主页分栏: ${action.payload}`);
      state.tab = action.payload;
    },
  },
});

export const { changeTag } = homeSlice.actions;
export default homeSlice.reducer;
