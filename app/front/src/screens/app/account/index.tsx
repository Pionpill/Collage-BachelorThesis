import { Stack } from "@mui/material";
import MainContainer from "../../../components/MainContainer";
import AccountData from "./AccountData";
import AccountProfile from "./AccountProfile";
import AccountService from "./AccountService";
import ActivityBanner from "./ActivityBanner";
import HeadSetting from "./HeadSetting";

const Account: React.FC = () => {
  return (
    <MainContainer sx={{ height: "calc(100vh - 56px)", p: 2 }}>
      <Stack gap={2} height="100%">
        <HeadSetting />
        <AccountProfile />
        <AccountData />
        <ActivityBanner />
        <AccountService />
      </Stack>
    </MainContainer>
  );
};

export default Account;
