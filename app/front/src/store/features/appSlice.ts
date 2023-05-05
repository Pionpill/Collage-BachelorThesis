import { createSlice } from "@reduxjs/toolkit";
import { getLocalTheme } from "../../utils/localStorageUtils";

export type LocalTheme = "dark" | "light";

interface AppState {
  theme: LocalTheme;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    theme: getLocalTheme(),
  },
  reducers: {
    toggleTheme: (state: AppState) => {
      console.log(`切换主题: ${state.theme}`);
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
