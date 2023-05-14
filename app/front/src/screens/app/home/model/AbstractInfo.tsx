import {
  Star,
  StarBorderOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  IconButton,
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
} from "../../../../api/userApi";
import AbstractCard from "../../../../components/AbstractCard";
import FlexBox from "../../../../components/FlexBox";
import ThreeModel from "../../../../models/ThreeModel";
import { RootState } from "../../../../store";
import { toggleModelDetailModel } from "../../../../store/features/modelSlice";
import { fontBold, partOpacitySx } from "../../../../styles/macro";

const AbstractInfo: React.FC<{ model: ThreeModel }> = ({ model }) => {
  const dispatch = useDispatch();
  const isPureModel = useSelector((state: RootState) => state.model.isPure);
  const userId = useSelector((state: RootState) => state.account.userId);
  const modelId = useParams().model?.slice(6);
  const [like, setLike] = React.useState<boolean>(false);
  const [collect, setCollect] = React.useState<boolean>(false);
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
  React.useState(() => {
    setLikeCondition();
    setCollectCondition();
  });
  return (
    <AbstractCard sx={{ visibility: isPureModel ? "hidden" : "visible" }}>
      <CardContent>
        <Typography variant="h6" sx={fontBold} pb={1}>
          {model.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ height: "60px", overflow: "hidden", ...partOpacitySx }}
        >
          {model.abstract}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
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
            详情
          </Button>
        </FlexBox>
      </CardActions>
    </AbstractCard>
  );
};

export default AbstractInfo;
