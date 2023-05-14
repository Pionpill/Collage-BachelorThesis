import { ArrowBackIos, QuestionMarkSharp } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import FlexBox from "../../../components/FlexBox";
import MainContainer from "../../../components/MainContainer";

const UploadWrapper: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FlexBox column align="flex-start" sx={{ height: "calc(100vh - 56px)" }}>
      <Paper
        sx={{
          width: "100%",
          borderRadius: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          pl: 1,
          pr: 1,
          zIndex: 100,
        }}
      >
        <IconButton title="返回" onClick={() => history.back()}>
          <ArrowBackIos fontSize="small" />
        </IconButton>
        <Typography align="center" m={1} variant="h6">
          {title}
        </Typography>
        <IconButton title="疑问" onClick={() => setOpen(true)}>
          <QuestionMarkSharp fontSize="small" />
        </IconButton>
      </Paper>
      <MainContainer
        sx={{ height: "calc(100vh - 96px)", p: 2, overflow: "auto" }}
      >
        {children}
      </MainContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>上传步骤提示</DialogTitle>
        <DialogContent>
          <List>
            <ListItemText primary="· 上传字段中带 * 为必填字段，不带 * 为选择性填写。" />
            <ListItemText primary="· 上传基本信息后需确认功能。" />
            <ListItemText primary="· 模型上传，预览模型并确认即可。" />
            <ListItemText primary="· 识别上传，需要识别到场景才能上传。" />
            <ListItemText primary="· 不提供上传文件(包括图片)服务，请另外存储后通过 url 传递。" />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            了解
          </Button>
        </DialogActions>
      </Dialog>
    </FlexBox>
  );
};

export default UploadWrapper;
