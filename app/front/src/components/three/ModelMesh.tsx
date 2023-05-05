import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

const ModelMesh: React.FC<{ modelUrl: string; meshProps?: MeshProps }> = ({
  modelUrl,
  meshProps,
}) => {
  const gltf = useGLTF(modelUrl);
  return (
    <mesh {...meshProps}>{gltf && <primitive object={gltf.scene} />}</mesh>
  );
};

export default ModelMesh;
