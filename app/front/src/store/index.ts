import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import appReducer from "./features/appSlice";
import homeReducer from "./features/homeSlice";
import identifyReducer from "./features/identifySlice";
import identifyUploadReducer from "./features/identifyUploadSlice";
import modelReducer from "./features/modelSlice";
import modelUploadReducer from "./features/modelUploadSlice";
import previewReducer from "./features/previewSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    home: homeReducer,
    model: modelReducer,
    preview: previewReducer,
    identify: identifyReducer,
    modelUpload: modelUploadReducer,
    identifyUpload: identifyUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
