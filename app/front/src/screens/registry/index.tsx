import {
  Button,
  Divider,
  Grid,
  MenuItem,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import MainContainer from "../../components/MainContainer";
import { UserPermission } from "../../models/User";
import RegistryScene from "./RegistryScene";

const RegistryTextField: React.FC<StandardTextFieldProps> = (props: any) => {
  return <TextField {...props} variant="standard" size="small" fullWidth />;
};

const SignUp: React.FC = () => {
  return (
    <FlexBox column fullWidth component="form" gap={1}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={6}>
          <RegistryTextField required label="用户名" />
        </Grid>
        <Grid item xs={6}>
          <RegistryTextField
            id="registry-permission"
            select
            required
            label="权限组"
            type="text"
          >
            <MenuItem value={UserPermission.visitor}>
              {UserPermission.visitor}
            </MenuItem>
            <MenuItem value={UserPermission.student}>
              {UserPermission.student}
            </MenuItem>
            <MenuItem value={UserPermission.teacher}>
              {UserPermission.teacher}
            </MenuItem>
          </RegistryTextField>
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField required label="密码" type="password" />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField label="学号/编号" type="text" />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField label="手机号" type="tel" />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField label="邮箱" type="email" />
        </Grid>
        <Typography variant="body2">
          学生与教师权限需要对应的学号/编码
        </Typography>
        <Grid item xs={12} mt={1}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "black",
            }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </FlexBox>
  );
};

const Registry: React.FC = () => {
  return (
    <MainContainer>
      <FlexBox column sx={{ height: "100vh" }}>
        <RegistryScene />
        <Typography component="h1" variant="h4">
          注册
        </Typography>
        <FlexBox column fullWidth m={3} gap={2}>
          <SignUp />
          <Divider variant="middle">
            <Typography variant="caption" color="text.secondary">
              第三方注册
            </Typography>
          </Divider>
          <FlexBox fullWidth column gap={1} mt={1}>
            <Button fullWidth variant="contained">
              SIGN UP with GITHUB
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};

export default Registry;
