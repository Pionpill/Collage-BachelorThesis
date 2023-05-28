import {
  EditCalendar,
  HistoryOutlined,
  Star,
  StarBorderOutlined,
  ThumbUp,
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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addModelLikeApi,
  deleteModelLikeApi,
  isModelLikedByUserApi,
} from "../../../../api/modelApi";
import {
  addUserCollectionApi,
  deleteUserCollectionApi,
  isModelCollectedByUserApi,
  isUserFollowApi,
  subscribeUserApi,
} from "../../../../api/userApi";
import FlexBox from "../../../../components/FlexBox";
import UserAvatar from "../../../../components/UserAvatar";
import ThreeModel from "../../../../models/ThreeModel";
import { RootState } from "../../../../store";
import { toggleModelDetailModel } from "../../../../store/features/modelSlice";
import { fontBold } from "../../../../styles/macro";
import {
  formatDate,
  formatLastUpdateTimeSpan,
} from "../../../../utils/dateUtils";

const DetailInfo: React.FC<{ model: ThreeModel }> = ({ model }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.account.userId);
  const modelId = useParams().model?.slice(6);
  const [like, setLike] = React.useState<boolean>(false);
  const [collect, setCollect] = React.useState<boolean>(false);
  const [subscribe, setSubscribe] = React.useState<boolean>(false);
  const setLikeCondition = async () => {
    if (userId === "visitor" || !modelId) return;
    const promise = isModelLikedByUserApi(modelId, userId);
    (await promise).json().then((response) => {
      setLike(response.data);
    });
  };
  const setCollectCondition = async () => {
    if (userId === "visitor" || !modelId) return;
    const promise = isModelCollectedByUserApi(modelId, userId);
    (await promise).json().then((response) => {
      setCollect(response.data);
    });
  };
  const setSubscribeCondition = async () => {
    const promise = isUserFollowApi(model.author.id, userId);
    (await promise).json().then((response) => {
      setSubscribe(response.data);
    });
  };
  React.useEffect(() => {
    setLikeCondition();
    setCollectCondition();
    setSubscribeCondition();
  });
  const handleClickLike = async () => {
    if (!modelId) return;
    if (like) {
      deleteModelLikeApi(modelId, userId);
      model.likeCount--;
      setLike(false);
    } else {
      addModelLikeApi(modelId, userId);
      model.likeCount++;
      setLike(true);
    }
  };
  const handleClickCollect = async () => {
    if (!modelId) return;
    if (collect) {
      deleteUserCollectionApi(modelId, userId);
      setCollect(false);
    } else {
      addUserCollectionApi(modelId, userId);
      setCollect(true);
    }
  };
  const handleSubscribe = () => {
    subscribeUserApi(model.author.id, userId);
    setSubscribe(true);
  };
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
        <IconButton onClick={handleClickLike}>
          {like ? (
            <ThumbUp fontSize="small" />
          ) : (
            <ThumbUpOutlined fontSize="small" />
          )}
          <Typography variant="body2" pl={1}>
            {model.likeCount > 999
              ? "999+"
              : model.likeCount > 99
              ? "99+"
              : model.likeCount}
          </Typography>
        </IconButton>
        <FlexBox gap={1}>
          {!subscribe && (
            <Button sx={{ color: "theme" }} onClick={handleSubscribe}>
              关注作者
            </Button>
          )}
          <Avatar
            sx={{ color: "divider", borderRadius: "4px", bgcolor: "divider" }}
            onClick={handleClickCollect}
          >
            {collect ? (
              <Star sx={{ color: "theme" }} />
            ) : (
              <StarBorderOutlined sx={{ color: "theme" }} />
            )}
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
