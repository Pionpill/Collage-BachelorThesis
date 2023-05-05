import {
  Camera,
  ExpandLess,
  ExpandMore,
  ViewInAr,
  Wifi,
} from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { FaChrome } from "react-icons/fa";
import { partOpacitySx } from "../styles/macro";
import PromptCard from "./PromptCard";

const ARPrompt: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const [cameraOpen, setCameraOpen] = React.useState<boolean>(false);
  const [deviceOpen, setDeviceOpen] = React.useState<boolean>(false);
  const [browserOpen, setBrowserOpen] = React.useState<boolean>(false);
  const [wifiOpen, setWifiOpen] = React.useState<boolean>(false);
  const [openAll, setOpenAll] = React.useState<boolean>(false);
  const toggleOpenAll = () => {
    setOpenAll(!openAll);
    if (openAll) {
      setCameraOpen(false);
      setDeviceOpen(false);
      setBrowserOpen(false);
      setWifiOpen(false);
    } else {
      setCameraOpen(true);
      setDeviceOpen(true);
      setBrowserOpen(true);
      setWifiOpen(true);
    }
  };
  return (
    <PromptCard sx={sx}>
      <CardContent>
        <Typography>开启 AR 功能需要满足以下所有条件:</Typography>
        <List sx={{ maxHeight: "400px", overflow: "auto" }}>
          <ListItemButton onClick={() => setCameraOpen(!cameraOpen)}>
            <ListItemIcon>
              <Camera />
            </ListItemIcon>
            <ListItemText>设备拥有摄像头</ListItemText>
            {cameraOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={cameraOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="subtitle2">
                    浏览器需要获取摄像头权限, 确保访问的是 https
                    协议网站，或者手动调整浏览器信任对应网站。否则浏览器无法获得摄像头权限。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setDeviceOpen(!deviceOpen)}>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText>设备能够提供 AR 服务</ListItemText>
            {deviceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={deviceOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="subtitle2">
                    安卓智能机需开启 AR 服务，请在 google play 安装 “面向 AR 的
                    Google Play 服务” 插件。苹果设备请查阅 ARKit 开启方案。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setBrowserOpen(!browserOpen)}>
            <ListItemIcon>
              <FaChrome />
            </ListItemIcon>
            <ListItemText>支持 AR 功能的浏览器</ListItemText>
            {browserOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={browserOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="subtitle2">
                    请尽量使用 chrome 浏览器，AR 功能至少需要 chrome 80+
                    版本。安卓设备尽量保持在系统 11+ 版本。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setWifiOpen(!wifiOpen)}>
            <ListItemIcon>
              <Wifi />
            </ListItemIcon>
            <ListItemText>良好的网络环境</ListItemText>
            {wifiOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={wifiOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="subtitle2">
                    出于优化考虑，系统不会一次推送所有数据，AR
                    部分功能需要实时获取网络资源。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Typography variant="caption">
          若 AR 按钮显示 unsupport
          等错误信息，请按条件检查设备并开启对应服务/权限。
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <FormControlLabel
          sx={{ pl: 2 }}
          control={<Switch />}
          onChange={toggleOpenAll}
          label="显示全部细节"
        />
      </CardActions>
    </PromptCard>
  );
};

export default ARPrompt;
