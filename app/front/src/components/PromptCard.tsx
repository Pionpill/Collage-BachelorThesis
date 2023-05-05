import { Card, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

const PromptCard: React.FC<PropsWithChildren<{ sx?: SxProps }>> = ({
  sx,
  children,
}) => {
  return (
    <Card
      sx={{ position: "absolute", width: "80vw", zIndex: 100, ...sx }}
      elevation={5}
    >
      {children}
    </Card>
  );
};

export default PromptCard;
