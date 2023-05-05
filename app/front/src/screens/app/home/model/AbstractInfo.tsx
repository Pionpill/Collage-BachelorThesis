import { StarBorderOutlined, ThumbUpOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AbstractCard from "../../../../components/AbstractCard";
import FlexBox from "../../../../components/FlexBox";
import ThreeModel from "../../../../models/ThreeModel";
import { RootState } from "../../../../store";
import { toggleModelDetailModel } from "../../../../store/features/modelSlice";
import { fontBold, partOpacitySx } from "../../../../styles/macro";

const AbstractInfo: React.FC<{ model: ThreeModel }> = ({ model }) => {
  const dispatch = useDispatch();
  const isPureModel = useSelector((state: RootState) => state.model.isPure);
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
            详情
          </Button>
        </FlexBox>
      </CardActions>
    </AbstractCard>
  );
};

export default AbstractInfo;
