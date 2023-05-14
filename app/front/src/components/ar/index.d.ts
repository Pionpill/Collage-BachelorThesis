import { Props } from "@react-three/fiber/dist/declarations/src/web/Canvas";
import { ReactNode } from "react";

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
  children: ReactNode;
}

export declare function ARCanvas(props: ARCanvasProps): JSX.Element;
