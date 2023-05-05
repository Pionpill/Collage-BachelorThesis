import {
  DoNotTouch,
  SpeakerNotes,
  SpeakerNotesOff,
  TouchApp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  togglePreviewHelpPrompt,
  togglePreviewPivot,
  togglePreviewPureModel,
} from "../../../store/features/previewSlice";

const Dial: React.FC<{ dialHidden?: boolean }> = ({ dialHidden }) => {
  const dispatch = useDispatch();
  const isPure = useSelector((state: RootState) => state.preview.isPure);
  const isPivot = useSelector((state: RootState) => state.preview.isPivot);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.preview.isHelpPrompt
  );
  return (
    <SpeedDial
      sx={{ position: "fixed", top: "16px", left: "16px" }}
      ariaLabel="dial"
      icon={<SpeedDialIcon />}
      direction="down"
      hidden={dialHidden}
    >
      <SpeedDialAction
        key="visible"
        tooltipTitle="显示/隐藏组件"
        icon={isPure ? <VisibilityOff /> : <Visibility />}
        onClick={() => dispatch(togglePreviewPureModel())}
      />
      <SpeedDialAction
        key="pivot"
        tooltipTitle="显示/隐藏坐标轴"
        icon={isPivot ? <TouchApp /> : <DoNotTouch />}
        onClick={() => dispatch(togglePreviewPivot())}
      />
      <SpeedDialAction
        key="help"
        tooltipTitle="显示/隐藏提示框"
        icon={isHelpPrompt ? <SpeakerNotes /> : <SpeakerNotesOff />}
        onClick={() => dispatch(togglePreviewHelpPrompt())}
      />
    </SpeedDial>
  );
};

const Widgets: React.FC<{ dialHidden?: boolean }> = ({ dialHidden }) => {
  return (
    <>
      <Dial dialHidden={dialHidden} />
    </>
  );
};

export default Widgets;
