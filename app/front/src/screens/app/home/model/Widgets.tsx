import {
  KeyboardBackspaceOutlined,
  SpeakerNotes,
  SpeakerNotesOff,
  ViewInAr,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  toggleModelHelpPrompt,
  toggleModelPureModel,
} from "../../../../store/features/modelSlice";

const Dial: React.FC = () => {
  const dispatch = useDispatch();
  const isHelpPrompt = useSelector(
    (state: RootState) => state.model.isHelpPrompt
  );
  const isPureModel = useSelector((state: RootState) => state.model.isPure);
  const showInAR = () => {
    location.replace(location.toString().replace("home", "preview"));
  };

  return (
    <SpeedDial
      sx={{ position: "fixed", top: "16px", left: "16px" }}
      ariaLabel="dial"
      icon={<SpeedDialIcon />}
      direction="down"
    >
      <SpeedDialAction
        key="back"
        tooltipTitle="回退"
        icon={<KeyboardBackspaceOutlined />}
        onClick={() => history.back()}
      />
      <SpeedDialAction
        key="visible"
        tooltipTitle="显示/隐藏组件"
        icon={isPureModel ? <VisibilityOff /> : <Visibility />}
        onClick={() => dispatch(toggleModelPureModel())}
      />
      <SpeedDialAction
        key="help"
        tooltipTitle="显示/隐藏提示框"
        icon={isHelpPrompt ? <SpeakerNotes /> : <SpeakerNotesOff />}
        onClick={() => dispatch(toggleModelHelpPrompt())}
      />
      <SpeedDialAction
        key="ar"
        tooltipTitle="进入 AR 模式"
        icon={<ViewInAr />}
        onClick={showInAR}
      />
    </SpeedDial>
  );
};

const Widgets: React.FC = () => {
  return (
    <>
      <Dial />
    </>
  );
};

export default Widgets;
