import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useSelector } from "react-redux";
import { uploadModelApi, UploadModelType } from "../../../../api/modelApi";
import FlexBox from "../../../../components/FlexBox";
import ModelControls from "../../../../components/three/ModelControls";
import ModelEnvironment from "../../../../components/three/ModelEnvironment";
import ModelFloat from "../../../../components/three/ModelFloat";
import ModelLights from "../../../../components/three/ModelLights";
import ModelMesh from "../../../../components/three/ModelMesh";
import { RootState } from "../../../../store";

const ModelConfirmDialog: React.FC<{ open: boolean; setOpen: Function }> = ({
  open,
  setOpen,
}) => {
  const modelUploadData = useSelector((state: RootState) => state.modelUpload);
  const accountId = useSelector((state: RootState) => state.account.userId);
  const handleUpload = async () => {
    const uploadData: UploadModelType = {
      authorId: accountId,
      ...modelUploadData,
    };
    console.log(uploadData);
    (await uploadModelApi(uploadData)).json().then((response) => {
      if (response.code === 200) {
        alert("模型上传成功");
        location.reload();
      }
    });
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClickClose} fullWidth>
      <DialogTitle>预览模型效果并确认</DialogTitle>
      <DialogContent>
        <FlexBox sx={{ height: "50vh" }}>
          <Canvas shadows camera={{ position: [5, 10, 4.5], fov: 50 }}>
            <Leva collapsed hidden />
            <ModelFloat
              floatFields={{
                speed: modelUploadData.speed,
                rotationIntensity: modelUploadData.rotationIntensity,
                floatIntensity: modelUploadData.floatIntensity,
              }}
            >
              <ModelMesh modelUrl={modelUploadData.modelUrl} />
            </ModelFloat>
            <ModelLights />
            <ModelEnvironment
              fields={{
                background: modelUploadData ? true : false,
                preset: modelUploadData.preset,
                blur: modelUploadData.blur,
              }}
            />
            <ModelControls
              fields={{ autoRotateSpeed: modelUploadData.autoRotateSpeed }}
            />
          </Canvas>
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpload}>确认并上传</Button>
        <Button onClick={handleClickClose}>返回修改</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelConfirmDialog;
