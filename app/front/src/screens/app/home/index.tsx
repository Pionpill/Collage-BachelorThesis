import { Stack } from "@mui/material";
import MainContainer from "../../../components/MainContainer";
import CommunityProfile from "./CommunityProfile";
import ContentFlow from "./ContentFlow";
import SelectBar from "./SelectBar";

const Home: React.FC = () => {
  return (
    <MainContainer sx={{ height: "calc(100vh - 56px)", p: 2 }}>
      <Stack gap={2} height="100%">
        <CommunityProfile />
        <SelectBar />
        <ContentFlow />
      </Stack>
    </MainContainer>
  );
};

export default Home;
