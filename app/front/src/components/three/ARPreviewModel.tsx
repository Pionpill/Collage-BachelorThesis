import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import React from "react";

const ARPreviewModel: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  const { x, y, z, rotateX, rotateY, rotateZ, scale } = useControls({
    x: { value: 0, min: -10, max: 10 },
    y: { value: 0, min: -10, max: 10 },
    z: { value: -3, min: -10, max: 10 },
    rotateX: { value: 0, min: -Math.PI, max: Math.PI },
    rotateY: { value: 0, min: -Math.PI, max: Math.PI },
    rotateZ: { value: 0, min: -Math.PI, max: Math.PI },
    scale: { value: 1, min: 0, max: 10 },
  });
  return (
    <mesh
      position={[x, y, z]}
      rotation={[rotateX, rotateY, rotateZ]}
      scale={[scale, scale, scale]}
    >
      {gltf && <primitive object={gltf.scene} />}
    </mesh>
  );
};

export default ARPreviewModel;
