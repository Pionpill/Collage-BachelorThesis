//@ts-expect-error
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex.js";

import { useFrame, useThree } from "@react-three/fiber";
import React, { useCallback, useEffect, useMemo } from "react";
import { ArToolkitContextProps, ArToolkitSourceProps } from "./types";

export type ARContextProps = {
  arToolkitContext: any;
};
export const ARContext = React.createContext<ARContextProps | null>(null);

const videoDomElemSelector = "#arjs-video";

type ARProviderProps = React.FC<{
  tracking?: boolean;
  children: React.ReactNode;
  sourceProps?: ArToolkitSourceProps;
  contextProps?: ArToolkitContextProps;
  onCameraStreamReady?: () => void;
  onCameraStreamError?: (e: any) => void;
}>;

export const ARProvider: ARProviderProps = ({
  tracking = true,
  children,
  sourceProps,
  contextProps,
  onCameraStreamReady,
  onCameraStreamError,
}) => {
  const { gl, camera } = useThree();

  const arContext = useMemo(() => {
    const arToolkitSource = new THREEx.ArToolkitSource(sourceProps);
    const arToolkitContext = new THREEx.ArToolkitContext(contextProps);

    return { arToolkitContext, arToolkitSource };
  }, [sourceProps, contextProps]);

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext;

    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(gl.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    }
  }, [gl, arContext, camera]);

  const onUnmount = useCallback(() => {
    window.removeEventListener("resize", onResize);

    arContext.arToolkitContext.arController.dispose();
    if (arContext.arToolkitContext.arController.cameraParam) {
      arContext.arToolkitContext.arController.cameraParam.dispose();
    }

    delete arContext.arToolkitContext;
    delete arContext.arToolkitSource;

    const video = document.querySelector(
      videoDomElemSelector
    ) as HTMLVideoElement;
    if (video) {
      (video as any).srcObject
        .getTracks()
        // @ts-expect-error
        .map((track) => track.stop())(video as any)
        .remove();
    }
  }, [onResize, arContext]);

  useEffect(() => {
    arContext.arToolkitSource.init(() => {
      const video = document.querySelector(
        videoDomElemSelector
      ) as HTMLVideoElement;
      video.style.position = "fixed";
      video.style.pointerEvents = "none";

      video.onloadedmetadata = () => {
        console.log(
          "actual source dimensions",
          video.videoWidth,
          video.videoHeight
        );

        if (video.videoWidth > video.videoHeight) {
          arContext.arToolkitContext.arController.orientation = "landscape";
          arContext.arToolkitContext.arController.options.orientation =
            "landscape";
        } else {
          arContext.arToolkitContext.arController.orientation = "portrait";
          arContext.arToolkitContext.arController.options.orientation =
            "portrait";
        }

        if (onCameraStreamReady) {
          onCameraStreamReady();
        }
        onResize();
      };
    }, onCameraStreamError);

    arContext.arToolkitContext.init(() =>
      camera.projectionMatrix.copy(
        arContext.arToolkitContext.getProjectionMatrix()
      )
    );

    window.addEventListener("resize", onResize);

    return onUnmount;
  }, [
    arContext,
    camera,
    onCameraStreamReady,
    onCameraStreamError,
    onResize,
    onUnmount,
  ]);

  useFrame(() => {
    if (!tracking) {
      return;
    }

    if (
      arContext.arToolkitSource &&
      arContext.arToolkitSource.ready !== false
    ) {
      arContext.arToolkitContext.update(arContext.arToolkitSource.domElement);
    }
  });

  const value = useMemo(
    () => ({ arToolkitContext: arContext.arToolkitContext }),
    [arContext]
  );

  console.log(value);

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
};

export const useARJS = () => {
  const value = React.useContext(ARContext) as ARContextProps;
  return React.useMemo(() => ({ ...value }), [value]);
};
