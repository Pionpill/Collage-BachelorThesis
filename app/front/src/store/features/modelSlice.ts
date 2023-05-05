import { createSlice } from "@reduxjs/toolkit";

interface ModelState {
  isDetail: boolean;
  isPure: boolean;
  isHelpPrompt: boolean;
}

export const modelSlice = createSlice({
  name: "home/model",
  initialState: {
    isDetail: false,
    isPure: false,
    isHelpPrompt: true,
  },
  reducers: {
    toggleModelDetailModel: (state: ModelState) => {
      console.log("切换显示模式");
      state.isDetail = !state.isDetail;
    },
    toggleModelPureModel: (state: ModelState) => {
      console.log("切换纯净模式");
      state.isPure = !state.isPure;
    },
    toggleModelHelpPrompt: (state: ModelState) => {
      console.log("切换显示提示框");
      state.isHelpPrompt = !state.isHelpPrompt;
    },
  },
});

export const {
  toggleModelDetailModel,
  toggleModelPureModel,
  toggleModelHelpPrompt,
} = modelSlice.actions;
export default modelSlice.reducer;
