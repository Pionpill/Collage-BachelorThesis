import { MeshProps } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { ARMarker, ARMarkerProps } from "../../../components/react-three-arjs";
import ModelMesh from "../../../components/three/ModelMesh";
import {
  changeInteractionMarkerId,
  changeInteractionTipCard,
} from "../../../store/features/interactionSlice";

type ARInteractionModelProps = {
  markerId: string;
  type: "pattern" | "barcode" | "nft" | "unknown";
  patternUrl: string;
  modelUrl: string;
  meshProps?: MeshProps;
  arMarkerProps?: ARMarkerProps;
};

const ARInteractionModel: React.FC<ARInteractionModelProps> = ({
  markerId,
  type,
  patternUrl,
  modelUrl,
  meshProps,
  arMarkerProps,
}) => {
  const dispatch = useDispatch();
  const onMarkerFound = () => {
    dispatch(changeInteractionMarkerId(markerId));
    dispatch(changeInteractionTipCard(true));
  };
  const onMarkerLost = () => {
    dispatch(changeInteractionTipCard(false));
  };

  return (
    <ARMarker
      onMarkerFound={onMarkerFound}
      onMarkerLost={onMarkerLost}
      type={type}
      patternUrl={patternUrl}
      {...arMarkerProps}
    >
      <ModelMesh modelUrl={modelUrl} meshProps={meshProps} />
    </ARMarker>
  );
};

export default ARInteractionModel;
