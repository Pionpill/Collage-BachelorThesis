import { useSelector } from "react-redux";
import { getUserById } from "../api/userApi";
import User from "../models/User";
import { RootState } from "../store";

const useCurrentAccount = async (): Promise<User> => {
  const userId = useSelector((state: RootState) => state.account.userId);
  return getUserById(userId);
};

export default useCurrentAccount;
