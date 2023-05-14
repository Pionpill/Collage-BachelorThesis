import {
  ContactsOutlined,
  ExpandLess,
  ExpandMore,
  MoreHoriz,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { banUserApi } from "../../../../api/userApi";
import FlexBox from "../../../../components/FlexBox";
import { RootState } from "../../../../store";

const ServiceListItem: React.FC<
  React.PropsWithChildren<{
    label: string;
    onClick?: MouseEventHandler;
    icon?: ReactNode;
    open?: boolean;
    sx?: SxProps;
  }>
> = ({ icon, label, open, sx, onClick, children }) => {
  return (
    <ListItemButton onClick={onClick} sx={sx}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
        primary={label}
        sx={{ color: "text.primary", opacity: 0.75 }}
      />
      {children}
      {typeof open === "boolean" ? (
        open ? (
          <ExpandLess sx={{ color: "text.primary" }} />
        ) : (
          <ExpandMore sx={{ color: "text.primary" }} />
        )
      ) : (
        <MoreHoriz sx={{ color: "text.primary", opacity: 0.5 }} />
      )}
    </ListItemButton>
  );
};

const AppSetting: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const requestVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(
      () => {
        alert("获取摄像头权限成功");
      },
      (response) => {
        alert(`获取摄像头权限失败: ${response}`);
      }
    );
  };

  return (
    <>
      <ServiceListItem
        icon={<SettingsOutlined sx={{ color: "theme" }} />}
        label="应用设置"
        open={open}
        onClick={handleClick}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ServiceListItem
            sx={{ pt: 0, pb: 0, pl: 4 }}
            onClick={requestVideo}
            label="请求摄像头权限"
          />
        </List>
      </Collapse>
    </>
  );
};

const AccountSetting: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [agreeOpen, setAgreeOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [banOpen, setBanOpen] = React.useState(false);
  const userId = useSelector((state: RootState) => state.account.userId);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleBan = () => {
    localStorage.clear();
    banUserApi(userId);
    navigate("/login");
  };
  return (
    <>
      <ServiceListItem
        icon={<ContactsOutlined sx={{ color: "theme" }} />}
        label="用户设置"
        open={open}
        onClick={handleClick}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ServiceListItem
            sx={{ pt: 0, pb: 0, pl: 4 }}
            label="用户协议"
            onClick={() => setAgreeOpen(true)}
          />
          <ServiceListItem
            sx={{ pt: 0, pb: 0, pl: 4 }}
            label="退出账号"
            onClick={() => setLogoutOpen(true)}
          />
          <ServiceListItem
            sx={{ pt: 0, pb: 0, pl: 4 }}
            label="注销账号"
            onClick={() => setBanOpen(true)}
          />
        </List>
      </Collapse>
      <Dialog open={agreeOpen}>
        <DialogTitle>用户协议</DialogTitle>
        <DialogContent>
          作者的毕业设计，项目在 Github 开源，采用 MIT
          协议。项目仅在本地浏览器存储非常少的数据，不会采集任何用户资料。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAgreeOpen(false)} variant="contained">
            了解
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={logoutOpen}>
        <DialogTitle>退出账号</DialogTitle>
        <DialogContent>
          请确认退出账号，这会清除浏览器本地数据，您需要重新登录。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogout()}>确定</Button>
          <Button onClick={() => setLogoutOpen(false)} variant="contained">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={banOpen}>
        <DialogTitle>注销账户</DialogTitle>
        <DialogContent>
          请确认注销账户，您的账户将永远(除非后台改动)无法被使用。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleBan()}>确定</Button>
          <Button onClick={() => setBanOpen(false)} variant="contained">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ServiceList: React.FC = () => {
  return (
    <FlexBox column align="space-between" fullWidth gap={1}>
      <Typography color="text.primary" variant="subtitle1">
        更多服务
      </Typography>
      <List>
        <AccountSetting />
        <AppSetting />
      </List>
    </FlexBox>
  );
};

export default ServiceList;
