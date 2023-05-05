import { createSlice } from "@reduxjs/toolkit";
import { userPionpill } from "../../data/user";
import User from "../../models/User";

interface AccountAction {
  type: string;
  payload: User;
}

interface AccountState {
  user: User;
}

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: userPionpill,
  },
  reducers: {
    changeAccountInfo: (state: AccountState, action: AccountAction) => {
      console.log(`切换用户: ${state.user.name}`);
      state.user = action.payload;
    },
  },
});

export const { changeAccountInfo } = accountSlice.actions;
export default accountSlice.reducer;
