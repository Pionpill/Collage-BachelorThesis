import { Center, Float } from "@react-three/drei";
import { PropsWithChildren } from "react";
import { FloatFields } from "../../models/ThreeModel";

const ModelFloat: React.FC<
  PropsWithChildren<{ floatFields?: FloatFields }>
> = ({ floatFields, children }) => {
  return (
    <Center top>
      <Float
        speed={floatFields?.speed}
        rotationIntensity={floatFields?.rotationIntensity || 0.5}
        floatIntensity={floatFields?.floatIntensity || 3}
        position={[0, 0, 0]}
      >
        {children}
      </Float>
    </Center>
  );
};

export default ModelFloat;
