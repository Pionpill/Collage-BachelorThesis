import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const ModelLights: React.FC = () => {
  return (
    <AccumulativeShadows
      temporal
      frames={100}
      color="gray"
      colorBlend={0.5}
      opacity={1}
      scale={10}
      alphaTest={0.85}
    >
      <RandomizedLight
        amount={8}
        radius={5}
        ambient={0.5}
        position={[5, 3, 2]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};

export default ModelLights;
