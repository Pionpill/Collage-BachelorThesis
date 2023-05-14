import MarkerInfo from "../models/MarkerInfo";
import { userShortPionpill } from "./user";

export const markerInfoTest = new MarkerInfo(
  "markerInfo-1",
  userShortPionpill,
  "https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100",
  "测试标记",
  "这是一个测试标记",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur error et magnam quia maxime delectus illo voluptatum distinctio, nam tempore rerum, dolores aliquid mollitia explicabo aliquam ea repudiandae voluptatibus unde.",
  "中苑",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);
