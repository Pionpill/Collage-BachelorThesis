import {
  AdminPanelSettings,
  Female,
  Male,
  Person4,
  School,
} from "@mui/icons-material";
import {
  blue,
  blueGrey,
  cyan,
  deepOrange,
  grey,
  indigo,
  purple,
  red,
} from "@mui/material/colors";
import { ReactNode } from "react";
import validator from "validator";
import { UserPermission, UserSexual } from "../models/User";

/**
 * 判断字符串是否为用户名，符合用户名规范，不是保留用户名
 * @param userName 用户名
 * @returns 字符串是否符合用户名规范
 * @throws 用户名为保留名
 */
export const checkUserName = (userName: string): boolean => {
  const reg = /^\S{2,16}$/;
  const keyName = ["游客"];
  if (keyName.includes(userName)) alert("用户名为保留单词");
  return reg.test(userName);
};

/**
 * 判断字符串是否为邮箱，符合邮箱规范
 * @param email 邮箱
 * @returns 字符串是否符合邮箱规范
 */
export const checkEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

/**
 * 判断字符串符合密码要求: 8-32字符,至少包含一个小写字母和大写字母
 * @param password 密码
 * @returns 字符串是否符合密码规范
 */
export const checkPassword = (password: string): boolean => {
  return (
    validator.isStrongPassword(password, {
      minLowercase: 1,
      minUppercase: 1,
    }) && validator.isLength(password, { min: 8, max: 32 })
  );
};

/**
 * 判断字符串是否为 URL
 * @param url URL
 * @returns 是否为 URL
 */
export const checkUrl = (url: string): boolean => {
  return validator.isURL(url);
};

/**
 * 通过用户性别获取对应默认色
 * @param sexual 性别
 * @returns 颜色
 */
export const getColorBySexual = (sexual: UserSexual): string => {
  switch (sexual) {
    case UserSexual.male:
      return blue[500];
    case UserSexual.female:
      return red[500];
    case UserSexual.secret:
      return deepOrange[500];
    case UserSexual.undefined:
      return grey[500];
  }
};

/**
 * 通过用户性别获取对应图标
 * @param sexual 性别
 * @returns 图标
 */
export const getIconBySexual = (sexual: UserSexual): ReactNode | null => {
  switch (sexual) {
    case UserSexual.male:
      return <Male fontSize="small" sx={{ color: blueGrey[500] }} />;
    case UserSexual.female:
      return <Female fontSize="small" sx={{ color: red[500] }} />;
    case UserSexual.undefined:
      return null;
  }
};

/**
 * 通过用户权限组获取对应默认色
 * @param permission 权限组
 * @returns 颜色
 */
export const getColorByPermission = (permission: UserPermission): string => {
  switch (permission) {
    case UserPermission.admin:
      return purple[500];
    case UserPermission.teacher:
      return indigo[500];
    case UserPermission.student:
      return cyan[500];
    case UserPermission.visitor:
      return grey[500];
  }
};

/**
 * 通过用户权限组获取对应图标
 * @param permission 权限组
 * @returns 图标
 */
export const getIconByPermission = (
  permission: UserPermission
): ReactNode | null => {
  switch (permission) {
    case UserPermission.admin:
      return (
        <AdminPanelSettings sx={{ color: getColorByPermission(permission) }} />
      );
    case UserPermission.teacher:
      return <Person4 sx={{ color: getColorByPermission(permission) }} />;
    case UserPermission.student:
      return <School sx={{ color: getColorByPermission(permission) }} />;
    case UserPermission.visitor:
      return null;
  }
};
