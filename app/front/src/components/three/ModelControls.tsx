import { OrbitControls } from "@react-three/drei";
import { ControlFields } from "../../models/ThreeModel";

const ModelControls: React.FC<{ fields?: ControlFields }> = ({ fields }) => {
  return (
    <OrbitControls
      autoRotate={fields?.autoRotateSpeed ? true : false}
      autoRotateSpeed={fields?.autoRotateSpeed}
    />
  );
};

export default ModelControls;
