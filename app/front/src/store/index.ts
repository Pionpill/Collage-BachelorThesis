import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import appReducer from "./features/appSlice";
import homeReducer from "./features/homeSlice";
import interactionReducer from "./features/interactionSlice";
import modelReducer from "./features/modelSlice";
import previewReducer from "./features/previewSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    home: homeReducer,
    model: modelReducer,
    preview: previewReducer,
    interaction: interactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
