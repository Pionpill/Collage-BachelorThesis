import {
  CenterFocusStrong,
  ExpandLess,
  ExpandMore,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PromptCard from "../../../components/PromptCard";
import { RootState } from "../../../store";
import { toggleInteractionHelpPrompt } from "../../../store/features/interactionSlice";
import { partOpacitySx } from "../../../styles/macro";

const InteractionPrompt: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const dispatch = useDispatch();
  const [pureOpen, setPureOpen] = React.useState<boolean>(false);
  const [modelOpen, setModelOpen] = React.useState<boolean>(false);
  const [openAll, setOpenAll] = React.useState<boolean>(false);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.interaction.isHelpPrompt
  );
  const toggleOpenAll = () => {
    setOpenAll(!openAll);
    if (openAll) {
      setPureOpen(false);
      setModelOpen(false);
    } else {
      setPureOpen(true);
      setModelOpen(true);
    }
  };
  return (
    <PromptCard sx={sx}>
      <CardContent>
        <Typography>交互功能介绍:</Typography>
        <Typography variant="caption">
          交互功能通过图像识别与标记跟踪技术捕捉现实世界信息，并将 AR
          功能呈现在屏幕上。
        </Typography>
        <List>
          <ListItemButton onClick={() => setPureOpen(!pureOpen)}>
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText>纯净模式</ListItemText>
            {pureOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={pureOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="body2">
                    进入纯净模式将隐藏不必要的功能按钮。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setModelOpen(!modelOpen)}>
            <ListItemIcon>
              <CenterFocusStrong />
            </ListItemIcon>
            <ListItemText>信息识别</ListItemText>
            {modelOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={modelOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="body2">
                    根据现实信息的不同，系统将混合使用图像识别与标记跟踪技术，尽量快速准确地识别现实世界。与此同时所有的识别信息都通过网络获取，请保留良好的网络情况。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <FormControlLabel
          sx={{ pl: 2 }}
          control={<Switch />}
          onChange={toggleOpenAll}
          label="显示全部"
        />
        <Button onClick={() => dispatch(toggleInteractionHelpPrompt())}>
          隐藏提示栏
        </Button>
      </CardActions>
    </PromptCard>
  );
};

export default InteractionPrompt;
