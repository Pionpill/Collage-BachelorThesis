import { Container, SxProps } from "@mui/material";

const MainContainer: React.FC<React.PropsWithChildren<{ sx?: SxProps }>> = ({
  sx,
  children,
}) => {
  return (
    <Container
      maxWidth="xs"
      component="main"
      sx={{
        bgcolor: "background.default",
        height: "100vh",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
