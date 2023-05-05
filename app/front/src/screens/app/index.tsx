import {
  Camera,
  ManageAccountsOutlined,
  StoreOutlined,
  ViewInAr,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AppWrapper: React.FC = () => {
  const [value, setValue] = React.useState("model");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Outlet />
      <Paper
        elevation={5}
        sx={{
          maxWidth: "100vw",
        }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            component={Link}
            label="首页"
            to="/app/home"
            value="home"
            icon={<StoreOutlined />}
            sx={{ minWidth: "60px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="预览"
            to="/app/preview"
            value="preview"
            icon={<ViewInAr />}
            sx={{ minWidth: "60px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="识别"
            to="/app/interaction"
            value="interaction"
            icon={<Camera />}
            sx={{ minWidth: "60px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="我的"
            to="/app/account"
            value="account"
            icon={<ManageAccountsOutlined />}
            sx={{ minWidth: "60px" }}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default AppWrapper;
