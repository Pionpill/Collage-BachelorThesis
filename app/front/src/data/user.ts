import User, { UserPermission, UserSexual } from "../models/User";
import UserShort from "../models/UserShort";

export const userShortPionpill = new UserShort(
  "201983290194",
  "pionpill",
  "https://avatars.githubusercontent.com/u/70939356?s=128&v=4",
  new Date(2000, 4, 16),
  new Date(2023, 2, 11)
);

export const userShortPionpillAlt = new UserShort(
  "201983290194",
  "北岸",
  "https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100",
  new Date(2022, 5, 9),
  new Date(2023, 4, 15)
);

export const userVisitor = new User(
  "201983290194",
  "游客",
  "https://avatars.githubusercontent.com/u/70939356?s=128&v=4",
  UserSexual["male"],
  UserPermission["visitor"],
  "游客测试账户",
  "软件学院",
  "软件工程系",
  ["游客测试账户"],
  new Date(2000, 4, 16),
  new Date(2023, 2, 11)
);

export const userPionpillAlt = new User(
  "201983290194",
  "北岸",
  "https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100",
  UserSexual["male"],
  UserPermission["student"],
  "小鸡炖蘑菇",
  "软件学院",
  "软件工程系",
  ["大一"],
  new Date(2022, 5, 9),
  new Date(2023, 4, 15)
);
