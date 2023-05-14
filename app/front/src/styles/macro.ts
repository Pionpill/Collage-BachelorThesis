import { SxProps } from "@mui/material";

export const SingleLineEllipsisSx: SxProps = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const partOpacitySx: SxProps = {
  opacity: 0.75,
};

export const halfOpacitySx: SxProps = {
  opacity: 0.5,
};

export const fontBold: SxProps = {
  fontWeight: 600,
  color: "text.primary",
};

export const TwoLineEllipsisSx: SxProps = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};

export const ThreeLineEllipsisSx: SxProps = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": 3,
  "-webkit-box-orient": "vertical",
};
