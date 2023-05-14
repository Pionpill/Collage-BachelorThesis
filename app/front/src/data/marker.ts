import Marker from "../models/Marker";
import { userShortPionpill } from "./user";

export const markerTest1 = new Marker(
  "marker-1",
  userShortPionpill,
  "pattern",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/hiro.patt",
  undefined,
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const markerTest2 = new Marker(
  "marker-2",
  userShortPionpill,
  "nft",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/trex-image-big",
  undefined,
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);
