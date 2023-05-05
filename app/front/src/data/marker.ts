import Marker from "../models/Marker";
import { userShortPionpill } from "./user";

export const markerTest = new Marker(
  "marker-1",
  userShortPionpill,
  "pattern",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/hiro.patt",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/air_zoom.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);
