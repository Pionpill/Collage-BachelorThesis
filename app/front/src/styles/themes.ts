import { createTheme, Theme } from "@mui/material/styles";

const generalTheme: Theme = createTheme({
  typography: {
    h1: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 400,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle2: {
      fontWeight: 400,
      lineHeight: 1.2,
    },
    caption: {
      lineHeight: 1.2,
    },
  },
});

export const lightTheme: Theme = createTheme(
  Object.assign(generalTheme, {
    palette: {
      mode: "light",
      theme: "#00838f",
    },
  })
);

export const darkTheme: Theme = createTheme(
  Object.assign(generalTheme, {
    palette: {
      mode: "dark",
      theme: "#00838f",
    },
  })
);
