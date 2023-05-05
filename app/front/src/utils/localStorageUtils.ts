import { LocalTheme } from "../store/features/appSlice";

/**
 * 设置主题
 * @param theme 主题(黑|白)
 */
export const setLocalTheme = (theme: LocalTheme): void => {
  localStorage.setItem("theme", theme);
};

/**
 * 从 localStorge 获取本地主题，如果没有，则通过浏览器主题设置主题，默认为白色主题
 * @returns 主题(黑|白)
 */
export const getLocalTheme = (): LocalTheme => {
  return "light";
  const localTheme: string | null = localStorage.getItem("theme");
  if (localTheme && (localTheme === "dark" || localTheme === "light"))
    return localTheme;
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkMode) {
    localStorage.setItem("theme", "dark");
    return "dark";
  }
  localStorage.setItem("theme", "light");
  return "light";
};
