import { OrbitControls } from "@react-three/drei";
import { CommonControlFields } from "../../models/ThreeModel";

const ModelControls: React.FC<{ fields?: CommonControlFields }> = ({
  fields,
}) => {
  return (
    <OrbitControls
      autoRotate={fields?.autoRotateSpeed ? true : false}
      autoRotateSpeed={fields?.autoRotateSpeed}
    />
  );
};

export default ModelControls;
