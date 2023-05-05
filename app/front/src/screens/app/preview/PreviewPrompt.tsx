import {
  ExpandLess,
  ExpandMore,
  TouchApp,
  ViewInAr,
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
import { togglePreviewHelpPrompt } from "../../../store/features/previewSlice";
import { partOpacitySx } from "../../../styles/macro";

const PreviewPrompt: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const dispatch = useDispatch();
  const isHelpPrompt = useSelector(
    (state: RootState) => state.preview.isHelpPrompt
  );
  const [pureOpen, setPureOpen] = React.useState<boolean>(false);
  const [pivotOpen, setPivotOpen] = React.useState<boolean>(false);
  const [modelOpen, setModelOpen] = React.useState<boolean>(false);
  const [openAll, setOpenAll] = React.useState<boolean>(false);
  const toggleOpenAll = () => {
    setOpenAll(!openAll);
    if (openAll) {
      setPureOpen(false);
      setPivotOpen(false);
      setModelOpen(false);
    } else {
      setPureOpen(true);
      setPivotOpen(true);
      setModelOpen(true);
    }
  };
  return (
    <PromptCard sx={sx}>
      <CardContent>
        <Typography>AR 预览功能介绍:</Typography>
        <Typography variant="caption">点击左上角按钮进行交互</Typography>
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
          <ListItemButton onClick={() => setPivotOpen(!pivotOpen)}>
            <ListItemIcon>
              <TouchApp />
            </ListItemIcon>
            <ListItemText>手动微调</ListItemText>
            {pivotOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={pivotOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="body2">
                    手动调整模式将显示三维控制轴，你可以通过控制轴手动调整模型的大小，位置，旋转角度。受限于设备性能，调整往往是卡顿不精确的，更推荐使用上方控制盘调整。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setModelOpen(!modelOpen)}>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText>模型来源</ListItemText>
            {modelOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={modelOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="body2">
                    纯前端仅支持通过 URL 访问模型，可通过 /model=preset-x
                    访问预留的模型。x 范围为
                    1-5。也可通过主页模型进入预览功能区。
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
        <Button onClick={() => dispatch(togglePreviewHelpPrompt())}>
          隐藏提示栏
        </Button>
      </CardActions>
    </PromptCard>
  );
};

export default PreviewPrompt;
