import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import FlexBox from "../../components/FlexBox";
import MainContainer from "../../components/MainContainer";
import TestScene from "./TestScene";

const Index: React.FC = () => {
  return (
    <MainContainer>
      <FlexBox column sx={{ height: "100vh" }}>
        <TestScene />
        <Typography variant="h3" component="h1">
          AR Campus
        </Typography>
        <Typography variant="body1">基于 WebGL 的校园交互系统</Typography>
        <Typography variant="caption" align="center">
          我们将使用您的摄像头与真实世界交互，请使用移动端设备。
        </Typography>
        <Typography
          variant="caption"
          align="center"
          color="text.secondary"
          mt={2}
        >
          请检查上方图案，你将看到一个中空的浮动方块，浏览器会实时计算反射等材质效果。您可以通过拖拽点击与其交互。如果您没有看到对应的元素，或无法交互，或出现强烈卡顿，请切换其他支持
          WebGL 的浏览器。
        </Typography>
        <FlexBox fullWidth column gap={2} mt={10}>
          <Button component={Link} to="/login" variant="contained" fullWidth>
            登录
          </Button>
          <Button component={Link} to="/registry" variant="outlined" fullWidth>
            注册
          </Button>
          <Button fullWidth>游客登录</Button>
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};

export default Index;
