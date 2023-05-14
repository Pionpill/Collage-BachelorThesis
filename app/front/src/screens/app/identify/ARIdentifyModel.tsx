import { MeshProps } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { ARMarker, ARMarkerProps } from "../../../components/ar/ARMarker";
import ModelMesh from "../../../components/three/ModelMesh";
import {
  changeIdentifyMarkerId,
  changeIdentifyTipCard,
} from "../../../store/features/identifySlice";

type ARIdentifyModelProps = {
  markerId: string;
  type: "pattern" | "barcode" | "nft" | "unknown";
  patternUrl?: string;
  barcodeValue?: string;
  descriptorsUrl?: string;
  modelUrl?: string;
  meshProps?: MeshProps;
  arMarkerProps?: ARMarkerProps;
};

const ARIdentifyModel: React.FC<ARIdentifyModelProps> = ({
  markerId,
  type,
  patternUrl,
  barcodeValue,
  descriptorsUrl,
  modelUrl,
  meshProps,
  arMarkerProps,
}) => {
  const dispatch = useDispatch();
  const onMarkerFound = () => {
    dispatch(changeIdentifyMarkerId(markerId));
    dispatch(changeIdentifyTipCard(true));
  };
  const onMarkerLost = () => {
    dispatch(changeIdentifyTipCard(false));
  };

  return (
    <ARMarker
      onMarkerFound={onMarkerFound}
      onMarkerLost={onMarkerLost}
      type={type}
      patternUrl={patternUrl}
      barcodeValue={barcodeValue}
      descriptorsUrl={descriptorsUrl}
      size={0.3}
      smooth
      smoothCount={6}
      smoothTolerance={0.05}
      smoothThreshold={2}
      {...arMarkerProps}
    >
      {modelUrl ? (
        <ModelMesh modelUrl={modelUrl} meshProps={meshProps} />
      ) : (
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      )}
    </ARMarker>
  );
};

export default ARIdentifyModel;
