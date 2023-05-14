import { createSlice } from "@reduxjs/toolkit";
import { getTimeSpan } from "../../utils/dateUtils";

interface AccountAction {
  type: string;
  payload: {
    userId: string;
  };
}

interface AccountState {
  userId: string;
}

const getInitUserId = (): string => {
  const checkLoginData = (loginData: Date): boolean => {
    const now = new Date();
    const spanDay = getTimeSpan(now, loginData);
    return spanDay <= 7;
  };
  const userId = localStorage.getItem("userId");
  const lastLoginDate = localStorage.getItem("lastLoginDate");
  if (
    userId !== null &&
    lastLoginDate !== null &&
    checkLoginData(new Date(lastLoginDate))
  )
    return userId;
  else return "visitor";
};

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userId: getInitUserId(),
  },
  reducers: {
    changeAccountInfo: (state: AccountState, action: AccountAction) => {
      console.log(`切换用户: ${state.userId}`);
      state.userId = action.payload.userId;
    },
  },
});

export const { changeAccountInfo } = accountSlice.actions;
export default accountSlice.reducer;
