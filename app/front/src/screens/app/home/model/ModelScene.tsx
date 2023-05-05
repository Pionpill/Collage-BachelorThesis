import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import React from "react";
import { useSelector } from "react-redux";
import FlexBox from "../../../../components/FlexBox";
import ModelControls from "../../../../components/three/ModelControls";
import ModelEnvironment from "../../../../components/three/ModelEnvironment";
import ModelFloat from "../../../../components/three/ModelFloat";
import ModelLights from "../../../../components/three/ModelLights";
import ModelMesh from "../../../../components/three/ModelMesh";
import ThreeModel from "../../../../models/ThreeModel";
import { RootState } from "../../../../store";
import ModelPrompt from "./ModelPrompt";

const LevaPanel: React.FC = () => {
  const isPure = useSelector((root: RootState) => root.model.isPure);
  return <Leva collapsed hidden={isPure} />;
};

const ModelScene: React.FC<{ model: ThreeModel }> = ({ model }) => {
  // TODO 向后端传输获取模型
  const isDetailModel = useSelector((state: RootState) => state.model.isDetail);
  const sceneHeight = isDetailModel ? "400px" : "calc(100vh - 56px)";
  return (
    <FlexBox sx={{ width: "100vw", height: sceneHeight }}>
      <LevaPanel />
      <ModelPrompt />
      <Canvas shadows camera={{ position: [5, 10, 4.5], fov: 50 }}>
        <ModelFloat floatFields={model.floatFields}>
          <ModelMesh modelUrl={model.modelUrl} />
        </ModelFloat>
        <ModelLights />
        <ModelEnvironment fields={model.environmentFields} />
        <ModelControls fields={model.controlFields} />
      </Canvas>
    </FlexBox>
  );
};

export default ModelScene;
