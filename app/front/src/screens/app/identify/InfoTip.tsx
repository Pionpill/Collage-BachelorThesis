import { Close, MoreHoriz } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
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
import {
  changeIdentifyInfoCard,
  changeIdentifyTipCard,
} from "../../../store/features/identifySlice";
import { fontBold, partOpacitySx } from "../../../styles/macro";

const InfoTip: React.FC = () => {
  const showTip = useSelector((root: RootState) => root.identify.showTip);
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
        bottom: "100px",
        height: "70px",
        display: "flex",
        visibility: showTip ? "visible" : "hidden",
        zIndex: 1050,
      }}
    >
      <FlexBox gap={2} m={2} justify="space-between" fullWidth>
        <FlexBox gap={2}>
          {markerInfo && (
            <>
              <Avatar
                variant="rounded"
                alt={markerInfo.title}
                src={markerInfo.coverUrl}
              />
              <FlexBox
                column
                align="flex-start"
                sx={{ maxWidth: "300px", overflow: "hidden" }}
              >
                <Typography sx={fontBold}>{markerInfo.title}</Typography>
                <Typography sx={partOpacitySx} variant="subtitle2">
                  {markerInfo.abstract}
                </Typography>
              </FlexBox>
            </>
          )}
        </FlexBox>
        <FlexBox gap={1}>
          <IconButton
            sx={{ ml: "auto", bgcolor: "theme" }}
            disableRipple
            onClick={() => dispatch(changeIdentifyInfoCard(true))}
          >
            <MoreHoriz fontSize="small" sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            sx={{ ml: "auto", bgcolor: "theme" }}
            disableRipple
            onClick={() => dispatch(changeIdentifyTipCard(false))}
          >
            <Close fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </FlexBox>
      </FlexBox>
    </AbstractCard>
  );
};

export default InfoTip;
