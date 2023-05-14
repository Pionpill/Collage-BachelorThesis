import { useEffect, useRef, useState } from "react";
import { MarkerControlsProps } from "./types";
//@ts-expect-error
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useARJS } from "./ARProvider";

export type ARMarkerProps = {
  onMarkerLost?: () => void;
  onMarkerFound?: () => void;
} & MarkerControlsProps &
  Omit<JSX.IntrinsicElements["group"], "type">;

export const ARMarker = ({
  size = 1.0,
  type = "nft",
  patternUrl,
  barcodeValue,
  descriptorsUrl,
  changeMatrixMode = "modelViewMatrix",
  minConfidence = 0.6,
  smooth = false,
  smoothCount = 5,
  smoothTolerance = 0.01,
  smoothThreshold = 2,
  onMarkerLost,
  onMarkerFound,
  children,
  ...props
}: ARMarkerProps) => {
  const markerRef = useRef<THREE.Group>(null!);
  const { arToolkitContext } = useARJS();
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    if (!arToolkitContext) return;

    const markerControls = new ArMarkerControls(
      arToolkitContext,
      markerRef.current,
      {
        type,
        barcodeValue: type === "barcode" ? barcodeValue : null,
        patternUrl: type === "pattern" ? patternUrl : null,
        descriptorsUrl: type === "nft" ? descriptorsUrl : null,
        changeMatrixMode,
        minConfidence,
        smooth,
        smoothCount,
        smoothTolerance,
        smoothThreshold,
      }
    );

    return () => {
      const index = arToolkitContext._arMarkersControls.indexOf(markerControls);
      arToolkitContext._arMarkersControls.splice(index, 1);
    };
  }, []);

  useFrame(() => {
    if (markerRef.current.visible && !isFound) {
      setIsFound(true);
      if (onMarkerFound) {
        onMarkerFound();
      }
    } else if (!markerRef.current.visible && isFound) {
      setIsFound(false);
      if (onMarkerLost) {
        onMarkerLost();
      }
    }
  });

  return (
    <group ref={markerRef} {...props}>
      {children}
    </group>
  );
};
