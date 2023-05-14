import {
  Add,
  CenterFocusStrong,
  ManageAccountsOutlined,
  StoreOutlined,
  ThreeDRotation,
  ViewInAr,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import FlexBox from "../../components/FlexBox";

const Upload: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <FlexBox
      position="absolute"
      sx={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        zIndex: 100,
        maxWidth: 56,
      }}
    >
      <IconButton
        sx={{ bgcolor: "theme", borderRadius: "8px" }}
        onClick={handleClick}
        disableRipple
      >
        <Add sx={{ color: "white" }} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: 110, horizontal: "center" }}
      >
        <FlexBox gap={3} m={2}>
          <FlexBox column>
            <IconButton component={Link} to="upload/model">
              <ThreeDRotation />
            </IconButton>
            <Typography variant="subtitle2">模型上传</Typography>
          </FlexBox>
          {/* <FlexBox column>
            <IconButton component={Link} to="upload/identify">
              <CenterFocusStrong />
            </IconButton>
            <Typography variant="subtitle2">识别上传</Typography>
          </FlexBox> */}
        </FlexBox>
      </Popover>
    </FlexBox>
  );
};

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
          position: "relative",
        }}
      >
        <Upload />
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
            value="upload"
            disableRipple
            disableTouchRipple
            sx={{ minWidth: "60px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="识别"
            to="/app/identify"
            value="identify"
            icon={<CenterFocusStrong />}
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
