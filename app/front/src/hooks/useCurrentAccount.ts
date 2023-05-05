import { useSelector } from "react-redux";
import User from "../models/User";
import { RootState } from "../store";

const useCurrentAccount = (): User => {
  return useSelector((state: RootState) => state.account.user);
};

export default useCurrentAccount;
