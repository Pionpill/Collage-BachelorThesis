import { Close, MoreHoriz } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AbstractCard from "../../../components/AbstractCard";
import FlexBox from "../../../components/FlexBox";
import MarkerInfoShort from "../../../models/MarkerInfoShort";
import { RootState } from "../../../store";
import {
  changeIdentifyInfoCard,
  changeIdentifyTipCard,
} from "../../../store/features/identifySlice";
import { fontBold, partOpacitySx } from "../../../styles/macro";

const InfoTip: React.FC<{ markerInfoShort: MarkerInfoShort }> = ({
  markerInfoShort,
}) => {
  const showTip = useSelector((root: RootState) => root.identify.showTip);
  const dispatch = useDispatch();

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
          <Avatar
            variant="rounded"
            alt={markerInfoShort.title}
            src={markerInfoShort.coverUrl}
          />
          <FlexBox
            column
            align="flex-start"
            sx={{ maxWidth: "300px", overflow: "hidden" }}
          >
            <Typography sx={fontBold}>{markerInfoShort.title}</Typography>
            <Typography sx={partOpacitySx} variant="subtitle2">
              {markerInfoShort.abstract}
            </Typography>
          </FlexBox>
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
