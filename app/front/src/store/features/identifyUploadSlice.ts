import { createSlice } from "@reduxjs/toolkit";

interface IdentifyUploadAction {
  type: string;
  payload: {
    fileUrl: string;
    fileType: string;
    title: string;
    type: string;
    modelId: string;
    lat?: number;
    lon?: number;
    coverUrl: string;
    location: string;
    abstract: string;
    introduction: string;
  };
}

interface IdentifyUploadState {
  fileUrl: string;
  fileType: string;
  title: string;
  type: string;
  modelId: string;
  lat?: number;
  lon?: number;
  coverUrl: string;
  location: string;
  abstract: string;
  introduction: string;
}

export const identifyUploadSlice = createSlice({
  name: "upload/identify",
  initialState: {
    fileUrl:
      "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/hiro.patt",
    title: "测试标记",
    // fileUrl: "",
    // title: "",
    fileType: "pattern",
    type: "common",
    modelId: "",
    lat: undefined,
    lon: undefined,
    coverUrl: "",
    location: "",
    abstract: "",
    introduction: "",
  },
  reducers: {
    updateIdentifyUpload: (
      state: IdentifyUploadState,
      action: IdentifyUploadAction
    ) => {
      console.log(`更新识别数据: ${action.payload.title}`);
      state = action.payload;
    },
  },
});

export const { updateIdentifyUpload } = identifyUploadSlice.actions;
export default identifyUploadSlice.reducer;
