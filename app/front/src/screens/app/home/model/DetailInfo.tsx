import {
  EditCalendar,
  HistoryOutlined,
  StarBorderOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBox from "../../../../components/FlexBox";
import UserAvatar from "../../../../components/UserAvatar";
import ThreeModel from "../../../../models/ThreeModel";
import { toggleModelDetailModel } from "../../../../store/features/modelSlice";
import { fontBold } from "../../../../styles/macro";
import {
  formatDate,
  formatLastUpdateTimeSpan,
} from "../../../../utils/dateUtils";

const DetailInfo: React.FC<{ model: ThreeModel }> = ({ model }) => {
  const dispatch = useDispatch();
  return (
    <Stack sx={{ p: 2, pb: "72px", height: "calc(100vh - 400px)" }} gap={3}>
      <FlexBox justify="space-between">
        <Typography variant="h6" sx={fontBold}>
          {model.title}
        </Typography>
        <FlexBox gap={1}>
          <UserAvatar
            name={model.author.name}
            headIcon={model.author.avatarUrl}
            size="xs"
          />
          <Typography variant="body1" sx={fontBold}>
            {model.author.name}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justify="flex-start" gap={2}>
        <FlexBox gap={1}>
          <Chip
            avatar={
              <Avatar
                sx={{ bgcolor: "divider", width: "30px", height: "30px" }}
              >
                <EditCalendar sx={{ color: "theme" }} fontSize="small" />
              </Avatar>
            }
            label="发布"
          />
          <Typography variant="body2">
            {formatDate(model.createTime!, "d")}
          </Typography>
        </FlexBox>
        <FlexBox gap={1}>
          <Chip
            avatar={
              <Avatar
                sx={{ bgcolor: "divider", width: "30px", height: "30px" }}
              >
                <HistoryOutlined sx={{ color: "theme" }} fontSize="small" />
              </Avatar>
            }
            label="更新"
          />
          <Typography variant="body2">
            {formatLastUpdateTimeSpan(model.updateTime!)}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox flex="1" overflow="auto" align="flex-start">
        <Typography>{model.abstract}</Typography>
      </FlexBox>
      <FlexBox justify="space-between">
        <IconButton>
          <ThumbUpOutlined fontSize="small" />
          <Typography variant="body2" pl={1}>
            {model.likeCount > 999
              ? "999+"
              : model.likeCount > 99
              ? "99+"
              : model.likeCount}
          </Typography>
        </IconButton>
        <FlexBox gap={1}>
          <Avatar
            sx={{ color: "divider", borderRadius: "4px", bgcolor: "divider" }}
          >
            {/* TODO 是否被用户收藏 */}
            <StarBorderOutlined sx={{ color: "theme" }} />
          </Avatar>
          <Button
            title="detail"
            variant="contained"
            sx={{ bgcolor: "theme", pr: "auto" }}
            onClick={() => dispatch(toggleModelDetailModel())}
          >
            简介
          </Button>
        </FlexBox>
      </FlexBox>
    </Stack>
  );
};

export default DetailInfo;
