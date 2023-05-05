import { createSlice } from "@reduxjs/toolkit";

interface PreviewState {
  isPure: boolean;
  isPivot: boolean;
  isHelpPrompt: boolean;
}

export const previewSlice = createSlice({
  name: "preview",
  initialState: {
    isPure: false,
    isPivot: false,
    isHelpPrompt: true,
  },
  reducers: {
    togglePreviewPureModel: (state: PreviewState) => {
      console.log("切换纯净模式");
      state.isPure = !state.isPure;
    },
    togglePreviewPivot: (state: PreviewState) => {
      console.log("切换显示坐标轴");
      state.isPivot = !state.isPivot;
    },
    togglePreviewHelpPrompt: (state: PreviewState) => {
      console.log("切换显示提示框");
      state.isHelpPrompt = !state.isHelpPrompt;
    },
  },
});

export const {
  togglePreviewPureModel,
  togglePreviewPivot,
  togglePreviewHelpPrompt,
} = previewSlice.actions;
export default previewSlice.reducer;
