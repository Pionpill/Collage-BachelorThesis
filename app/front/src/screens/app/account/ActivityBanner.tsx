import { ChevronRight } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ActivityBanner: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button
        sx={{
          bgcolor: "theme",
          p: 1,
          pl: 2,
          pr: 2,
          borderRadius: "4px",
        }}
        onClick={() => setOpen(true)}
      >
        <Stack>
          <Typography variant="body1" color="white" textAlign="left">
            AR Campus 使用手册
          </Typography>
          <Typography variant="body2" color="white" sx={{ opacity: 0.75 }}>
            学习如何利用 WebGL 技术进行 AR 交互
          </Typography>
        </Stack>
        <Button>
          <ChevronRight sx={{ color: "white" }} />
        </Button>
      </Button>
      <Dialog open={open} scroll="paper">
        <DialogTitle>AR Campus 使用手册</DialogTitle>
        <DialogContent>
          <DialogContentText>
            AR Campus 使用 WebGL 与 AR.js 构建现实与虚拟场景的交互系统。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivityBanner;
