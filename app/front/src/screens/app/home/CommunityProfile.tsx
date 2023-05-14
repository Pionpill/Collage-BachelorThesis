import {
  Air,
  Brightness7,
  CelebrationOutlined,
  Cloud,
  MailOutline,
  NightsStay,
  SevereCold,
} from "@mui/icons-material";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { BsFillCloudRainFill } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import { GiFog } from "react-icons/gi";
import aMapWeatherApi from "../../../api/aMapApi";
import FlexBox from "../../../components/FlexBox";
import { userVisitor } from "../../../data/user";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
import User from "../../../models/User";

const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 6) return "凌晨好";
  if (hour < 9) return "早上好";
  if (hour < 11) return "上午好";
  if (hour < 13) return "中午好";
  if (hour < 18) return "下午好";
  else return "晚上好,";
};

const getWeatherIcon = (weather: string | null): ReactNode => {
  const getTimeIcon = (): ReactNode => {
    const hour = new Date().getHours();
    return hour < 8 || hour > 20 ? <NightsStay /> : <Brightness7 />;
  };
  if (!weather) return getTimeIcon();
  if (weather.includes("阴") || weather?.includes("云")) return <Cloud />;
  if (weather.includes("风")) return <Air />;
  if (weather.includes("雪")) return <SevereCold />;
  if (weather.includes("雨")) return <BsFillCloudRainFill />;
  if (weather.includes("雾") || weather.includes("霾")) return <GiFog />;
  if (weather.includes("热")) return <FaHotjar />;
  if (weather.includes("冷")) return <SevereCold />;
  else return getTimeIcon();
};

const CommunityProfile: React.FC = () => {
  const [account, setAccount] = React.useState<User>(userVisitor);
  const [activityOpen, setActivityOpen] = React.useState<boolean>(false);
  const [emailOpen, setEmailOpen] = React.useState<boolean>(false);
  const promise = useCurrentAccount();
  const [weather, setWeather] = React.useState<string | null>(null);
  React.useState(() => {
    aMapWeatherApi().then((response) => {
      setWeather(response.lives[0].weather);
    });
    promise.then((user) => {
      setAccount(user);
    });
  });

  return (
    <FlexBox justify="space-between" fullWidth>
      <FlexBox>
        <Tooltip title={weather}>
          <IconButton>{getWeatherIcon(weather)}</IconButton>
        </Tooltip>
        <Typography color="text.primary" variant="h6" pl={1}>
          {account.name},
        </Typography>
        <Typography color="text.secondary">{getTimeGreeting()}</Typography>
      </FlexBox>
      <FlexBox gap={1}>
        {/* TODO 消息数量通过 API 获取 */}
        <IconButton onClick={() => setActivityOpen(true)}>
          <Badge
            color="success"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <CelebrationOutlined sx={{ opacity: 0.75 }} />
          </Badge>
        </IconButton>
        <IconButton onClick={() => setEmailOpen(true)}>
          <Badge
            color="success"
            badgeContent={0}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MailOutline sx={{ opacity: 0.75 }} />
          </Badge>
        </IconButton>
      </FlexBox>
      <Dialog open={activityOpen} scroll="paper">
        <DialogTitle>近期活动</DialogTitle>
        <DialogContent>
          <DialogContentText>
            项目完成了，来试试吧。遇到 BUG 请联系作者: 673486387@qq.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivityOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={emailOpen} scroll="paper">
        <DialogTitle>邮箱</DialogTitle>
        <DialogContent>
          <DialogContentText>
            未接入邮箱系统，这里仅留一个 Icon，如有需要请自行接入。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
    </FlexBox>
  );
};

export default CommunityProfile;
