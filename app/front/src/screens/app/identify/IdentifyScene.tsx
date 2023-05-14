import React from "react";
import { ARCanvas } from "../../../components/ar";
import AREnvironment from "../../../components/three/AREnvironment";
import Marker from "../../../models/Marker";
import ARIdentifyModel from "./ARIdentifyModel";

const IdentifyScene: React.FC<{ markers: Marker[] }> = ({ markers }) => {
  return (
    <>
      <ARCanvas
        onCreated={({ gl, camera }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
          camera.updateProjectionMatrix();
          camera.near = 1;
          camera.far = 10000;
        }}
        gl={{
          alpha: true,
          antialias: true,
          precision: "highp",
          logarithmicDepthBuffer: true,
        }}
        shadows
      >
        <>
          {markers.map((marker) => (
            <ARIdentifyModel
              markerId={marker.id}
              type={marker.type}
              patternUrl={
                marker.type === "pattern" ? marker.fileUrl : undefined
              }
              descriptorsUrl={
                marker.type === "nft" ? marker.fileUrl : undefined
              }
              barcodeValue={
                marker.type === "barcode" ? marker.fileUrl : undefined
              }
              modelUrl={marker.modelUrl}
            />
          ))}
        </>
        <AREnvironment />
      </ARCanvas>
    </>
  );
};

export default IdentifyScene;
