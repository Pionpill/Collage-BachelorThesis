import React from "react";
import { ARCanvas } from "../../../components/react-three-arjs";
import AREnvironment from "../../../components/three/AREnvironment";
import { defaultARModelUrl } from "../../../config";
import Marker from "../../../models/Marker";
import ARInteractionModel from "./ARInteractionModel";

const InteractionScene: React.FC<{ marker: Marker }> = ({ marker }) => {
  return (
    <>
      <ARCanvas
        camera={{ position: [0, 0, 0] }}
        dpr={window.devicePixelRatio}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <AREnvironment />
        <ARInteractionModel
          markerId={marker.id}
          type={marker.type}
          patternUrl={marker.patternUrl}
          modelUrl={marker.modelUrl || defaultARModelUrl}
        />
      </ARCanvas>
    </>
  );
};

export default InteractionScene;
