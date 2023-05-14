import {
  BookOutlined,
  GitHub,
  SchoolOutlined,
  SmsFailedOutlined,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import FlexBox from "../../../../components/FlexBox";
import { themeColor } from "../../../../styles/themes";

const RelationLinkButton: React.FC<
  React.PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
  return (
    <Grid
      item
      xs={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
      <Typography color="text.primary" variant="body2" sx={{ opacity: 0.75 }}>
        {label}
      </Typography>
    </Grid>
  );
};

const ServiceListItem: React.FC<{
  icon: ReactNode;
  label: string;
}> = ({ icon, label }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ color: "text.primary", opacity: 0.75 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const RelationLink: React.FC = () => {
  return (
    <FlexBox align="space-between" fullWidth column gap={1}>
      <Typography color="text.primary" variant="subtitle1">
        相关链接
      </Typography>
      <Grid container>
        <RelationLinkButton label="学校官网">
          <IconButton href="https://www.nuist.edu.cn/main.htm">
            <SchoolOutlined sx={{ color: "theme" }} fontSize="large" />
          </IconButton>
        </RelationLinkButton>
        <RelationLinkButton label="了解 WebGL">
          <IconButton href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial">
            <SmsFailedOutlined sx={{ color: "theme" }} fontSize="large" />
          </IconButton>
        </RelationLinkButton>
        <RelationLinkButton label="了解 AR">
          <IconButton href="https://ar-js-org.github.io/AR.js-Docs/">
            <BookOutlined sx={{ color: "theme" }} fontSize="large" />
          </IconButton>
        </RelationLinkButton>
        <RelationLinkButton label="了解作者">
          <IconButton href="https://pionpill.github.io/">
            <BsFillPersonVcardFill size={35} color={themeColor} />
          </IconButton>
        </RelationLinkButton>
        <RelationLinkButton label="开源地址">
          <IconButton href="https://github.com/Pionpill/Collage-BacheiorThesis">
            <GitHub sx={{ color: "theme" }} fontSize="large" />
          </IconButton>
        </RelationLinkButton>
      </Grid>
    </FlexBox>
  );
};

export default RelationLink;
