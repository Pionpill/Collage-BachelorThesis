import { Props } from "@react-three/fiber/dist/declarations/src/web/Canvas";

export interface ARCanvasProps extends Props {
  arEnabled?: boolean;
  tracking?: boolean;
  patternRatio?: number;
  detectionMode?: string;
  cameraParametersUrl?: string;
  matrixCodeType?: string;
  sourceType?: string;
  onCameraStreamReady?: Function;
  onCameraStreamError?: Function;
}

export interface ARMarkerProps {
  children: React.ReactNode;
  type: "pattern" | "barcode" | "nft" | "unknown";
  size?: number;
  patternUrl?: string;
  descriptorsUrl?: string;
  changeMatrixMode?: "modelViewMatrix" | "cameraTransformMatrix";
  minConfidence?: number;
  smooth?: boolean;
  smoothCount?: number;
  smoothTolerance?: number;
  smoothThreshold?: number;
  onMarkerFound?: Function;
  onMarkerLost?: Function;
}

export declare function ARCanvas(props: ARCanvasProps): JSX.Element;
export declare function ARMarker(props: ARMarkerProps): JSX.Element;
