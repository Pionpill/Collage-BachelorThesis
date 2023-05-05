import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { CSSProperties } from "react";

type Props = {
  direction?: CSSProperties["flexDirection"];
  column?: boolean;
  wrap?: CSSProperties["flexWrap"];
  grow?: CSSProperties["flexGrow"];
  basis?: CSSProperties["flexBasis"];
  shrink?: CSSProperties["flexShrink"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  fullWidth?: boolean;
};

const FlexBox = styled(Box)<Props>`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  flex-direction: ${({ direction, column }) => (column ? "column" : direction)};
  flex-wrap: ${({ wrap }) => wrap};
  flex-grow: ${({ grow }) => grow};
  flex-basis: ${({ basis }) => basis};
  flex-shrink: ${({ shrink }) => shrink};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

export default FlexBox;
