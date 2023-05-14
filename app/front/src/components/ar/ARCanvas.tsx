/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-pascal-case */

import { Canvas, events } from "@react-three/fiber";

import { ARProvider } from "./ARProvider";

const eventManagerFactory = (state: any) => ({
  ...events(state),

  compute(event: any, state: any) {
    state.pointer.set(
      (event.clientX / state.size.width) * 2 - 1,
      -(event.clientY / state.size.height) * 2 + 1
    );
    state.raycaster.setFromCamera(state.pointer, state.camera);
  },
});

type ARCanvasProps = React.FC<{
  arEnabled?: boolean;
  tracking?: boolean;
  children?: React.ReactNode;
  patternRatio?: number;
  detectionMode?: string;
  cameraParametersUrl: string;
  matrixCodeType?: string;
  sourceType?: string;
  onCameraStreamReady?: () => void;
  onCameraStreamError?: () => void;
  camera?: any;
}>;

const ARCanvas: ARCanvasProps = ({
  arEnabled = true,
  tracking = true,
  children,
  patternRatio = 0.5,
  detectionMode = "mono_and_matrix",
  cameraParametersUrl = "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/config/camera_para.dat",
  matrixCodeType = "3x3",
  sourceType = "webcam",
  onCameraStreamReady,
  onCameraStreamError,
  ...props
}) => (
  <Canvas
    events={eventManagerFactory}
    camera={arEnabled ? { position: [0, 0, 0] } : props.camera}
    {...props}
  >
    {arEnabled ? (
      <ARProvider
        tracking={tracking}
        contextProps={{
          debug: false,
          cameraParametersUrl: `https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/config/camera_para.dat`,
          detectionMode: "mono_and_matrix",
          matrixCodeType: "3x3",
          maxDetectionRate: 60,
          imageSmoothingEnabled: true,

          patternRatio: 0.5,
        }}
        onCameraStreamReady={onCameraStreamReady}
        onCameraStreamError={onCameraStreamError}
      >
        {children}
      </ARProvider>
    ) : (
      children
    )}
  </Canvas>
);

export default ARCanvas;
