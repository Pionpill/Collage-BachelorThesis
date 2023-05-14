import ThreeModel from "../models/ThreeModel";
import ThreeModelShort from "../models/ThreeModelShort";
import { userShortPionpill, userShortPionpillAlt } from "./user";

const threeModelShoes = new ThreeModel(
  "1",
  userShortPionpill,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_shoe.png",
  "Nike Air 跑鞋",
  71,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/air_zoom.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

threeModelShoes.environmentFields = {
  background: true,
  preset: "lobby",
  blur: 0.6,
};

export { threeModelShoes };

export const threeModelMac = new ThreeModel(
  "2",
  userShortPionpill,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_mac.png",
  "Mac 笔记本",
  7,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/mac-draco.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const threeModelKamdo = new ThreeModel(
  "3",
  userShortPionpillAlt,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_robot.png",
  "机器人",
  87,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/s2wt_kamdo_industrial_divinities-transformed.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const threeModelBench = new ThreeModel(
  "4",
  userShortPionpillAlt,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_chair.png",
  "我的世界椅子",
  19,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/bench_minecraft.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const threeModelMaple = new ThreeModel(
  "5",
  userShortPionpillAlt,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_maple.png",
  "枫树",
  84,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/japanese_maple.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const threeModelLight = new ThreeModel(
  "6",
  userShortPionpill,
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_light.png",
  "灯",
  7,
  "这是一个前端预留模型。",
  "https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/scifi_light_05.glb",
  new Date(2022, 10, 10, 11, 32, 32, 109),
  new Date(2022, 11, 10, 11, 32, 32, 109)
);

export const threeModelShortShoes: ThreeModelShort = threeModelShoes;
export const threeModelShortMac: ThreeModelShort = threeModelMac;
export const threeModelShortKamdo: ThreeModelShort = threeModelKamdo;

export const presetModels = [
  threeModelBench,
  threeModelKamdo,
  threeModelLight,
  threeModelMac,
  threeModelMaple,
  threeModelShoes,
];
