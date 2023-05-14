import {
  SpeakerNotes,
  SpeakerNotesOff,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  toggleIdentifyHelpPrompt,
  toggleIdentifyPureModel,
} from "../../../store/features/identifySlice";

const Dial: React.FC<{ dialHidden?: boolean }> = ({ dialHidden }) => {
  const dispatch = useDispatch();
  const isPure = useSelector((state: RootState) => state.identify.isPure);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.identify.isHelpPrompt
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
        onClick={() => dispatch(toggleIdentifyPureModel())}
      />
      <SpeedDialAction
        key="help"
        tooltipTitle="显示/隐藏提示框"
        icon={isHelpPrompt ? <SpeakerNotes /> : <SpeakerNotesOff />}
        onClick={() => dispatch(toggleIdentifyHelpPrompt())}
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
