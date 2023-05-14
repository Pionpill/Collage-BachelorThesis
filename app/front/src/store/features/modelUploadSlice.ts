import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { createSlice } from "@reduxjs/toolkit";

interface ModelUploadAction {
  type: string;
  payload: {
    modelUrl: string;
    coverUrl: string;
    title: string;
    info: string;
    autoRotateSpeed?: number;
    background?: boolean;
    preset?: PresetsType;
    blur?: number;
    speed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
  };
}

export interface ModelUploadState {
  modelUrl: string;
  coverUrl: string;
  title: string;
  info: string;
  autoRotateSpeed?: number;
  background?: boolean;
  preset?: PresetsType;
  blur?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}

export const modelUploadSlice = createSlice({
  name: "upload/model",
  initialState: {
    modelUrl: "",
    coverUrl: "",
    title: "",
    info: "",
    autoRotateSpeed: undefined,
    background: undefined,
    preset: undefined,
    blur: undefined,
    speed: undefined,
    rotationIntensity: undefined,
    floatIntensity: undefined,
  },
  reducers: {
    updateModelUpload: (state: ModelUploadState, action: ModelUploadAction) => {
      state.modelUrl = action.payload.modelUrl;
      state.coverUrl = action.payload.coverUrl;
      state.title = action.payload.title;
      state.info = action.payload.info;
      state.autoRotateSpeed = action.payload.autoRotateSpeed;
      state.background = action.payload.background;
      state.preset = action.payload.preset;
      state.blur = action.payload.blur;
      state.speed = action.payload.speed;
      state.rotationIntensity = action.payload.rotationIntensity;
      state.floatIntensity = action.payload.floatIntensity;
    },
  },
});

export const { updateModelUpload } = modelUploadSlice.actions;
export default modelUploadSlice.reducer;
