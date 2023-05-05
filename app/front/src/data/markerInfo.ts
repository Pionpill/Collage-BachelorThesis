import MarkerInfo from "../models/MarkerInfo";
import { userShortPionpill } from "./user";

export const markerInfoTest = new MarkerInfo(
  "markerInfo-1",
  userShortPionpill,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/nuist/imags/business.jpg?imageMogr2/thumbnail/200x",
  "测试标记",
  "这是一个测试标记",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur error et magnam quia maxime delectus illo voluptatum distinctio, nam tempore rerum, dolores aliquid mollitia explicabo aliquam ea repudiandae voluptatibus unde.",
  "中苑",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);
