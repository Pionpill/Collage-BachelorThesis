import {
  Air,
  Brightness7,
  CelebrationOutlined,
  Cloud,
  MailOutline,
  NightsStay,
  SevereCold,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { BsFillCloudRainFill } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import { GiFog } from "react-icons/gi";
import aMapWeatherApi from "../../../api/aMapWeatherApi";
import FlexBox from "../../../components/FlexBox";
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
  const account: User = useCurrentAccount();
  const [weather, setWeather] = React.useState<string | null>(null);
  React.useState(() => {
    aMapWeatherApi().then((response) => {
      const newWeather = response.lives[0].weather;
      setWeather(newWeather);
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
        <IconButton>
          <Badge
            color="success"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <CelebrationOutlined sx={{ opacity: 0.75 }} />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge
            color="success"
            badgeContent={100}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MailOutline sx={{ opacity: 0.75 }} />
          </Badge>
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
};

export default CommunityProfile;
