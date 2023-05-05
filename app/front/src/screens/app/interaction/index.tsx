import { ARButton } from "@react-three/xr";
import { Leva } from "leva";
import React from "react";
import { useSelector } from "react-redux";
import ARPrompt from "../../../components/ARPrompt";
import FlexBox from "../../../components/FlexBox";
import { markerTest } from "../../../data/marker";
import { markerInfoTest } from "../../../data/markerInfo";
import { RootState } from "../../../store";
import InfoCard from "./InfoCard";
import InfoTip from "./InfoTip";
import InteractionPrompt from "./InteractionPrompt";
import InteractionScene from "./InteractionScene";
import Widgets from "./Widgets";

const Interaction: React.FC = () => {
  const [ARMode, setARMode] = React.useState<boolean>(false);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.interaction.isHelpPrompt
  );
  const LevaPanel: React.FC = () => {
    const isPure = useSelector((state: RootState) => state.interaction.isPure);
    return <Leva collapsed hidden={!ARMode || isPure} />;
  };
  return (
    <>
      <Widgets dialHidden={!ARMode} />
      <FlexBox
        sx={{
          height: "calc(100vh - 56px)",
          position: "relative",
          bgcolor: ARMode ? "auto" : "background.paper",
        }}
      >
        <LevaPanel />
        <ARButton onClick={() => setARMode(!ARMode)} />
        <InfoTip markerInfoShort={markerInfoTest} />
        <InfoCard markerInfo={markerInfoTest} />
        <ARPrompt sx={{ visibility: ARMode ? "hidden" : "visible" }} />
        <InteractionPrompt
          sx={{ visibility: ARMode && isHelpPrompt ? "visible" : "hidden" }}
        />
        {ARMode && <InteractionScene marker={markerTest} />}
      </FlexBox>
    </>
  );
};

export default Interaction;
