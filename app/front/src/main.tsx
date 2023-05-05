import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import useThemeChoice from "./hooks/useThemeChoice";
import "./index.css";
import AppRoutes from "./routes";
import store from "./store";
import { darkTheme, lightTheme } from "./styles/themes";

const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useThemeChoice(lightTheme, darkTheme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <Theme>
        <AppRoutes />
      </Theme>
    </Provider>
  </React.StrictMode>
);
