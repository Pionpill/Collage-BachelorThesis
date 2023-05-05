import {
  ContactsOutlined,
  ExpandLess,
  ExpandMore,
  MoreHoriz,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";
import FlexBox from "../../../../components/FlexBox";

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
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="性能设置" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="权限设置" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="主题设置" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="颜色设置" />
        </List>
      </Collapse>
    </>
  );
};

const AccountSetting: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
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
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="账号资料" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="用户协议" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="退出账号" />
          <ServiceListItem sx={{ pt: 0, pb: 0, pl: 4 }} label="注销账号" />
        </List>
      </Collapse>
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
        <AppSetting />
        <AccountSetting />
      </List>
    </FlexBox>
  );
};

export default ServiceList;
