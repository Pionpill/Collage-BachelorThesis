type Degree = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const iconSizeSelector = (degree: Degree | undefined): number => {
  switch (degree) {
    case "xxs":
      return 18;
    case "xs":
      return 26;
    case "sm":
      return 32;
    case "md":
      return 40;
    case "lg":
      return 48;
    case "xl":
      return 54;
    case "xxl":
      return 64;
    default:
      return 40;
  }
};

export default Degree;
