import {
  Button,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MarkerInfoApiType,
  getMarkerInfoByMarkerIdApi,
} from "../../../api/markerApi";
import { getUserById } from "../../../api/userApi";
import AbstractCard from "../../../components/AbstractCard";
import FlexBox from "../../../components/FlexBox";
import MarkerInfo, { MarkerInfoFields } from "../../../models/MarkerInfo";
import User from "../../../models/User";
import { UserShortFields } from "../../../models/UserShort";
import { RootState } from "../../../store";
import { changeIdentifyInfoCard } from "../../../store/features/identifySlice";
import { fontBold } from "../../../styles/macro";
import { formatDate, formatLastUpdateTimeSpan } from "../../../utils/dateUtils";

const InfoCard: React.FC = () => {
  const showInfo = useSelector((state: RootState) => state.identify.showInfo);
  const markerId = useSelector((state: RootState) => state.identify.markerId);
  const [markerInfo, setMarkerInfo] = React.useState<MarkerInfo | null>(null);
  const dispatch = useDispatch();

  const initMarkerInfo = async () => {
    (await getMarkerInfoByMarkerIdApi(markerId))
      .json()
      .then(async (response) => {
        const markerInfoApiDate: MarkerInfoApiType = response.data;
        const author = (await getUserById(
          String(markerInfoApiDate!.authorId)
        )) as User;
        const userData: UserShortFields = {
          id: author.id,
          name: author.name,
          avatarUrl: author.avatarUrl,
        };
        const markerInfoData: MarkerInfoFields = {
          location: markerInfoApiDate.location,
          introduction: markerInfoApiDate.detailInfo,
          coverUrl: markerInfoApiDate.coverUrl,
          title: markerInfoApiDate.title,
          abstract: markerInfoApiDate.abstractInfo,
          id: String(markerInfoApiDate.id),
        };
        const markerInfo = MarkerInfo.fromJson(markerInfoData, userData);
        setMarkerInfo(markerInfo);
      });
  };

  React.useEffect(() => {
    if (!markerId) return;
    initMarkerInfo();
  }, [markerId]);

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
          {markerInfo && (
            <>
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
            </>
          )}
        </FlexBox>
      </CardContent>
      <Divider />
      <CardActionArea>
        <FlexBox justify="flex-end" m={2}>
          <Button
            variant="contained"
            onClick={() => dispatch(changeIdentifyInfoCard(false))}
          >
            关闭介绍
          </Button>
        </FlexBox>
      </CardActionArea>
    </AbstractCard>
  );
};

export default InfoCard;
