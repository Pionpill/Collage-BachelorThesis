import { Button, TextField, Typography } from "@mui/material";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import React from "react";
import { useDispatch } from "react-redux";
import UploadWrapper from "..";
import FlexBox from "../../../../components/FlexBox";
import {
  BgPresetMenuItems,
  BooleanMenuItems,
} from "../../../../components/menuItems";
import { updateModelUpload } from "../../../../store/features/modelUploadSlice";
import { fontBold } from "../../../../styles/macro";
import ModelConfirmDialog from "./ModelConfirmDialog";

const ModelUpload: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const modelUrlRef = React.useRef<HTMLInputElement>(null!);
  const coverUrlRef = React.useRef<HTMLInputElement>(null!);
  const titleRef = React.useRef<HTMLInputElement>(null!);
  const infoRef = React.useRef<HTMLInputElement>(null!);
  const speedRef = React.useRef<HTMLInputElement>(null!);
  const rotationIntensityRef = React.useRef<HTMLInputElement>(null!);
  const floatIntensityRef = React.useRef<HTMLInputElement>(null!);
  const autoRotateSpeedRef = React.useRef<HTMLInputElement>(null!);
  const backgroundRef = React.useRef<HTMLInputElement>(null!);
  const presetRef = React.useRef<HTMLInputElement>(null!);
  const blurRef = React.useRef<HTMLInputElement>(null!);
  const handleClickOpen = () => {
    const modelUrl = modelUrlRef.current.value;
    const coverUrl = coverUrlRef.current.value;
    const title = titleRef.current.value;
    const info = infoRef.current.value;
    const autoRotateSpeed =
      Number(autoRotateSpeedRef.current.value) || undefined;
    const background = Boolean(backgroundRef.current.value) || undefined;
    const preset = presetRef.current.value as PresetsType;
    const blur = Number(blurRef.current.value) || undefined;
    const speed = Number(speedRef.current.value) || undefined;
    const rotationIntensity =
      Number(rotationIntensityRef.current.value) || undefined;
    const floatIntensity = Number(floatIntensityRef.current.value) || undefined;
    if (!modelUrl || !coverUrl || !title || !info) {
      alert("带 * 号的数据必填");
      return;
    }
    dispatch(
      updateModelUpload({
        modelUrl: modelUrl,
        coverUrl: coverUrl,
        title: title,
        info: info,
        autoRotateSpeed: autoRotateSpeed,
        background: background,
        preset: preset,
        blur: blur,
        speed: speed,
        rotationIntensity: rotationIntensity,
        floatIntensity: floatIntensity,
      })
    );
    setOpen(true);
  };

  return (
    <UploadWrapper title="WebGL 模型上传">
      <FlexBox column fullWidth gap={3} overflow="auto">
        <FlexBox column fullWidth component="form" gap={1}>
          <Typography sx={fontBold}>模型基本信息</Typography>
          <TextField
            inputRef={modelUrlRef}
            fullWidth
            label="模型 URL"
            required
            size="small"
            variant="filled"
            helperText="目前仅支持 glb 文件格式"
          />
          <TextField
            inputRef={coverUrlRef}
            fullWidth
            required
            size="small"
            variant="filled"
            label="模型封面 URL"
          />
          <TextField
            inputRef={titleRef}
            fullWidth
            required
            size="small"
            variant="filled"
            label="模型名称"
          />
          <TextField
            inputRef={infoRef}
            fullWidth
            required
            multiline
            rows={5}
            size="small"
            label="模型简介"
          />
        </FlexBox>
        <FlexBox column fullWidth component="form" gap={1}>
          <Typography sx={fontBold}>模型控制信息(选填)</Typography>
          <FlexBox fullWidth gap={1}>
            <TextField
              inputRef={speedRef}
              label="浮动速度 (默认: 1)"
              size="small"
              variant="filled"
            />
            <TextField
              inputRef={rotationIntensityRef}
              label="自旋强度 (默认: 1)"
              size="small"
              variant="filled"
            />
          </FlexBox>
          <FlexBox fullWidth gap={1}>
            <TextField
              inputRef={floatIntensityRef}
              label="浮动强度 (默认: 1)"
              size="small"
              variant="filled"
            />
            <TextField
              inputRef={autoRotateSpeedRef}
              label="自旋速度 (默认: 1)"
              size="small"
              variant="filled"
            />
          </FlexBox>
          <TextField
            inputRef={backgroundRef}
            fullWidth
            label="是否需要背景"
            size="small"
            select
            variant="filled"
          >
            <BooleanMenuItems />
          </TextField>
          <TextField
            inputRef={presetRef}
            fullWidth
            label="背景预设"
            size="small"
            select
            variant="filled"
          >
            <BgPresetMenuItems />
          </TextField>
          <TextField
            inputRef={blurRef}
            fullWidth
            label="背景模糊程度 (0-1)"
            size="small"
            variant="filled"
          />
        </FlexBox>
        <Button variant="contained" onClick={() => handleClickOpen()}>
          预览效果
        </Button>
      </FlexBox>
      <ModelConfirmDialog open={open} setOpen={setOpen} />
    </UploadWrapper>
  );
};

export default ModelUpload;
