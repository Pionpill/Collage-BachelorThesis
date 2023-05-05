import {
  ExpandLess,
  ExpandMore,
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
import PromptCard from "../../../../components/PromptCard";
import { RootState } from "../../../../store";
import { toggleModelHelpPrompt } from "../../../../store/features/modelSlice";
import { partOpacitySx } from "../../../../styles/macro";

const ModelPrompt: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const dispatch = useDispatch();
  const [pureOpen, setPureOpen] = React.useState<boolean>(false);
  const [AROpen, setAROpen] = React.useState<boolean>(false);
  const [openAll, setOpenAll] = React.useState<boolean>(false);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.model.isHelpPrompt
  );
  const toggleOpenAll = () => {
    setOpenAll(!openAll);
    if (openAll) {
      setPureOpen(false);
      setAROpen(false);
    } else {
      setPureOpen(true);
      setAROpen(true);
    }
  };
  return (
    <PromptCard sx={{ visibility: isHelpPrompt ? "visible" : "hidden" }}>
      <CardContent>
        <Typography>模型预览功能介绍:</Typography>
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
                    进入纯净模式将隐藏不必要的功能按钮及简介面板。
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton onClick={() => setAROpen(!AROpen)}>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText>AR 预览</ListItemText>
            {AROpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={AROpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText sx={partOpacitySx}>
                  <Typography variant="body2">
                    将模型放入 AR 环境预览
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
        <Button onClick={() => dispatch(toggleModelHelpPrompt())}>
          隐藏提示栏
        </Button>
      </CardActions>
    </PromptCard>
  );
};

export default ModelPrompt;
