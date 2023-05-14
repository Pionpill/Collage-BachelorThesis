import { createSlice } from "@reduxjs/toolkit";

export enum HomeTab {
  recommend = "recommend",
  new = "new",
  star = "star",
}

interface HomeState {
  tab: HomeTab;
  search: string;
}

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    tab: HomeTab.recommend,
    search: "",
  },
  reducers: {
    changeTag: (
      state: HomeState,
      action: { type: string; payload: HomeTab }
    ) => {
      console.log(`切换主页分栏: ${action.payload}`);
      state.tab = action.payload;
    },
    changeSearch: (
      state: HomeState,
      action: { type: string; payload: string }
    ) => {
      console.log(`切换搜索内容: ${action.payload}`);
      state.search = action.payload;
    },
  },
});

export const { changeTag, changeSearch } = homeSlice.actions;
export default homeSlice.reducer;
