import { createSlice } from "@reduxjs/toolkit";

interface IdentifyState {
  isPure: boolean;
  isHelpPrompt: boolean;
  markerId: string;
  showInfo: boolean;
  showTip: boolean;
}

export const identifySlice = createSlice({
  name: "identify",
  initialState: {
    isPure: true,
    isHelpPrompt: false,
    markerId: "",
    showInfo: false,
    showTip: false,
  },
  reducers: {
    toggleIdentifyPureModel: (state: IdentifyState) => {
      console.log("切换纯净模式");
      state.isPure = !state.isPure;
    },
    toggleIdentifyHelpPrompt: (state: IdentifyState) => {
      console.log("切换显示提示框");
      state.isHelpPrompt = !state.isHelpPrompt;
    },
    changeIdentifyInfoCard: (
      state: IdentifyState,
      action: { type: string; payload: boolean }
    ) => {
      console.log("切换显示信息卡");
      state.showInfo = action.payload;
    },
    changeIdentifyTipCard: (
      state: IdentifyState,
      action: { type: string; payload: boolean }
    ) => {
      console.log("切换显示信息卡");
      state.showTip = action.payload;
    },
    changeIdentifyMarkerId: (
      state: IdentifyState,
      action: { type: string; payload: string }
    ) => {
      state.markerId = action.payload;
    },
  },
});

export const {
  toggleIdentifyPureModel,
  toggleIdentifyHelpPrompt,
  changeIdentifyInfoCard,
  changeIdentifyTipCard,
  changeIdentifyMarkerId,
} = identifySlice.actions;
export default identifySlice.reducer;
