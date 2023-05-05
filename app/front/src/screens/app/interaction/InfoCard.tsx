import {
  Button,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AbstractCard from "../../../components/AbstractCard";
import FlexBox from "../../../components/FlexBox";
import MarkerInfo from "../../../models/MarkerInfo";
import { RootState } from "../../../store";
import { changeInteractionInfoCard } from "../../../store/features/interactionSlice";
import { fontBold } from "../../../styles/macro";
import { formatDate, formatLastUpdateTimeSpan } from "../../../utils/dateUtils";

const InfoCard: React.FC<{ markerInfo: MarkerInfo }> = ({ markerInfo }) => {
  const showInfo = useSelector(
    (state: RootState) => state.interaction.showInfo
  );
  const dispatch = useDispatch();

  return (
    <AbstractCard
      sx={{
        visibility: showInfo ? "visible" : "hidden",
        height: "auto",
        bottom: "100px",
        zIndex: 1050,
      }}
    >
      <CardContent sx={{ gap: 8 }}>
        <FlexBox gap={2} column>
          <Typography variant="h4" align="center" sx={fontBold}>
            {markerInfo.title}
          </Typography>
          <FlexBox gap={2}>
            {markerInfo.location && (
              <FlexBox gap={1}>
                <Typography variant="subtitle1" sx={fontBold}>
                  地点:
                </Typography>
                <Typography variant="subtitle1">
                  {markerInfo.location}
                </Typography>
              </FlexBox>
            )}
            {markerInfo.createTime && (
              <FlexBox gap={1}>
                <Typography variant="subtitle1" sx={fontBold}>
                  发布:
                </Typography>
                <Typography variant="subtitle1">
                  {formatDate(markerInfo.createTime, "d")}
                </Typography>
              </FlexBox>
            )}
            {markerInfo.updateTime && (
              <FlexBox gap={1}>
                <Typography variant="subtitle1" sx={fontBold}>
                  更新:
                </Typography>
                <Typography variant="subtitle1">
                  {formatLastUpdateTimeSpan(markerInfo.updateTime)}
                </Typography>
              </FlexBox>
            )}
          </FlexBox>
          <Typography
            sx={{ maxHeight: "calc(100vh - 400px)", overflow: "auto" }}
          >
            {markerInfo.introduction}
          </Typography>
        </FlexBox>
      </CardContent>
      <Divider />
      <CardActionArea>
        <FlexBox justify="flex-end" m={2}>
          <Button
            variant="contained"
            onClick={() => dispatch(changeInteractionInfoCard(false))}
          >
            关闭介绍
          </Button>
        </FlexBox>
      </CardActionArea>
    </AbstractCard>
  );
};

export default InfoCard;
