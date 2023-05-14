import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import UploadWrapper from "..";
import FlexBox from "../../../../components/FlexBox";
import { fontBold } from "../../../../styles/macro";
import IdentifyConfirmDialog from "./IdentifyConfirmDialog";

// TODO: 砍掉不做了，图像识别验证过程。
const IdentifyUpload: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <UploadWrapper title="AR 识别数据上传">
      <FlexBox column fullWidth gap={3} overflow="auto">
        <FlexBox column fullWidth component="form" gap={1}>
          <Typography sx={fontBold}>标识基本信息</Typography>
          <TextField
            fullWidth
            label="文件 URL"
            required
            size="small"
            variant="filled"
          />

          <FlexBox fullWidth gap={1}>
            <TextField
              fullWidth
              required
              size="small"
              variant="filled"
              label="文件类型"
            />
            <TextField
              fullWidth
              label="标识名称"
              required
              size="small"
              variant="filled"
            />
          </FlexBox>
          <FlexBox fullWidth gap={1}>
            <TextField
              fullWidth
              required
              size="small"
              variant="filled"
              label="标识类型"
            />
            <TextField
              fullWidth
              size="small"
              required
              variant="filled"
              label="对应模型 Id"
            />
          </FlexBox>
          <FlexBox fullWidth gap={1}>
            <TextField
              fullWidth
              size="small"
              variant="filled"
              label="地理位置(经度)"
            />
            <TextField
              fullWidth
              size="small"
              variant="filled"
              label="地理位置(纬度)"
            />
          </FlexBox>
        </FlexBox>
        <FlexBox column fullWidth component="form" gap={1}>
          <Typography sx={fontBold}>标识文本基本信息</Typography>
          <TextField
            fullWidth
            label="封面图 URL"
            required
            size="small"
            variant="filled"
          />
          <TextField fullWidth label="所在位置" size="small" variant="filled" />
          <TextField
            fullWidth
            multiline
            rows={2}
            label="简要介绍"
            required
            size="small"
            variant="filled"
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            label="详细介绍"
            required
            size="small"
            variant="filled"
          />
        </FlexBox>
        <Button variant="contained" onClick={() => handleClickOpen()}>
          确认标识
        </Button>
      </FlexBox>
      <IdentifyConfirmDialog open={open} setOpen={setOpen} />
    </UploadWrapper>
  );
};

export default IdentifyUpload;
