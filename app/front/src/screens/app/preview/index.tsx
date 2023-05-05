import { PivotControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, Controllers, Interactive, XR } from "@react-three/xr";
import { Leva } from "leva";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ARPrompt from "../../../components/ARPrompt";
import FlexBox from "../../../components/FlexBox";
import AREnvironment from "../../../components/three/AREnvironment";
import ARPreviewModel from "../../../components/three/ARPreviewModel";
import {
  threeModelBench,
  threeModelKamdo,
  threeModelLight,
  threeModelMac,
  threeModelMaple,
  threeModelShoes,
} from "../../../data/threeModel";
import ThreeModel from "../../../models/ThreeModel";
import { RootState } from "../../../store";
import PreviewPrompt from "./PreviewPrompt";
import Widgets from "./Widgets";

const Preview: React.FC = () => {
  const [ARMode, setARMode] = React.useState<boolean>(false);
  const isPivot = useSelector((state: RootState) => state.preview.isPivot);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.preview.isHelpPrompt
  );
  const modelParam = useParams().model;
  const [model, setModel] = React.useState<ThreeModel | null>(null);
  React.useEffect(() => {
    if (modelParam?.includes("preset")) {
      switch (modelParam.slice(6)) {
        case "preset-1":
          setModel(threeModelShoes);
          break;
        case "preset-3":
          setModel(threeModelMac);
          break;
        case "preset-4":
          setModel(threeModelKamdo);
          break;
        case "preset-6":
          setModel(threeModelBench);
          break;
        case "preset-8":
          setModel(threeModelMaple);
          break;
        case "preset-10":
          setModel(threeModelLight);
          break;
        default:
          setModel(threeModelShoes);
          break;
      }
    }
  });
  const LevaPanel: React.FC = () => {
    const isPure = useSelector((state: RootState) => state.preview.isPure);
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
        <ARPrompt sx={{ visibility: ARMode ? "hidden" : "visible" }} />
        <PreviewPrompt
          sx={{ visibility: ARMode && isHelpPrompt ? "visible" : "hidden" }}
        />
        <ARButton />
        <Canvas>
          <XR
            onSessionStart={() => setARMode(true)}
            onSessionEnd={() => setARMode(false)}
          >
            <AREnvironment />
            <Interactive>
              <PivotControls
                depthTest={false}
                anchor={[0, 0, 0]}
                visible={!isPivot}
              >
                {model && <ARPreviewModel modelUrl={model?.modelUrl} />}
              </PivotControls>
            </Interactive>
            <Controllers />
          </XR>
        </Canvas>
      </FlexBox>
    </>
  );
};

export default Preview;
