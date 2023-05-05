import { createSlice } from "@reduxjs/toolkit";

interface InteractionState {
  isPure: boolean;
  isHelpPrompt: boolean;
  markerId: string;
  showInfo: boolean;
  showTip: boolean;
}

export const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    isPure: true,
    isHelpPrompt: true,
    markerId: "",
    showInfo: false,
    showTip: false,
  },
  reducers: {
    toggleInteractionPureModel: (state: InteractionState) => {
      console.log("切换纯净模式");
      state.isPure = !state.isPure;
    },
    toggleInteractionHelpPrompt: (state: InteractionState) => {
      console.log("切换显示提示框");
      state.isHelpPrompt = !state.isHelpPrompt;
    },
    changeInteractionInfoCard: (
      state: InteractionState,
      action: { type: string; payload: boolean }
    ) => {
      console.log("切换显示信息卡");
      state.showInfo = action.payload;
    },
    changeInteractionTipCard: (
      state: InteractionState,
      action: { type: string; payload: boolean }
    ) => {
      console.log("切换显示信息卡");
      state.showTip = action.payload;
    },
    changeInteractionMarkerId: (
      state: InteractionState,
      action: { type: string; payload: string }
    ) => {
      state.markerId = action.payload;
    },
  },
});

export const {
  toggleInteractionPureModel,
  toggleInteractionHelpPrompt,
  changeInteractionInfoCard,
  changeInteractionTipCard,
  changeInteractionMarkerId,
} = interactionSlice.actions;
export default interactionSlice.reducer;
