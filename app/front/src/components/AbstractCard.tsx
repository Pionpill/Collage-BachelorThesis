import { Card, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

const AbstractCard: React.FC<PropsWithChildren<{ sx?: SxProps }>> = ({
  sx,
  children,
}) => {
  return (
    <Card
      sx={{
        position: "absolute",
        bottom: "16px",
        width: "calc(100% - 32px)",
        height: "200px",
        ml: "16px",
        mr: "16px",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default AbstractCard;
