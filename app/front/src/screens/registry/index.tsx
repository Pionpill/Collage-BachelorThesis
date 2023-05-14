import {
  Button,
  Grid,
  MenuItem,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { registryApi } from "../../api/userApi";
import FlexBox from "../../components/FlexBox";
import MainContainer from "../../components/MainContainer";
import { formatMessage } from "../../config/message";
import { UserPermission } from "../../models/User";
import {
  checkEmail,
  checkPassword,
  checkUrl,
  checkUserName,
} from "../../utils/userUtils";
import RegistryScene from "./RegistryScene";

const RegistryTextField: React.FC<StandardTextFieldProps> = (props: any) => {
  return <TextField {...props} variant="standard" size="small" fullWidth />;
};

const SignUp: React.FC = () => {
  const nameRef = React.useRef<HTMLInputElement>(null!);
  const permissionRef = React.useRef<HTMLInputElement>(null!);
  const passwordRef = React.useRef<HTMLInputElement>(null!);
  const idRef = React.useRef<HTMLInputElement>(null!);
  const emailRef = React.useRef<HTMLInputElement>(null!);
  const avatarUrlRef = React.useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const handleRegistry = async () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const id = idRef.current.value;
    const email = emailRef.current.value;
    const avatarUrl = avatarUrlRef.current.value;

    const tempPermission = permissionRef.current.value;
    const permissionMap = new Map<string, string>([
      ["学生", "student"],
      ["老师", "teacher"],
      ["管理员", "admin"],
    ]);
    const permission = permissionMap.get(tempPermission);

    if (!name || !permission || !password || !id || !email) {
      alert("带 * 的字段必须填写");
      return;
    }
    if (!checkUserName(name)) {
      alert(`用户名格式错误: ${formatMessage.userName}`);
      return;
    }
    if (!checkPassword(password)) {
      alert(`密码格式错误: ${formatMessage.userPassword}`);
      return;
    }
    if (!checkEmail(email)) {
      alert(`邮箱格式错误`);
      return;
    }
    if (!checkUrl(avatarUrl)) {
      alert(`头像 URL 错误`);
      return;
    }
    console.log(`尝试注册 ${name}`);
    const promise = await registryApi(
      name,
      permission,
      password,
      id,
      email,
      avatarUrl
    );
    promise.json().then((response) => {
      if (response.code === 500) alert(response.message);
      else if (response.code === 200) {
        alert(`${response.message}, 即将跳转至登录界面。`);
        navigate("/login");
      }
    });
  };

  return (
    <FlexBox column fullWidth component="form" gap={1}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={6}>
          <RegistryTextField inputRef={nameRef} required label="用户名" />
        </Grid>
        <Grid item xs={6}>
          <RegistryTextField
            id="registry-permission"
            inputRef={permissionRef}
            select
            required
            label="权限组"
            type="text"
          >
            <MenuItem value={UserPermission.student}>
              {UserPermission.student}
            </MenuItem>
            <MenuItem value={UserPermission.teacher}>
              {UserPermission.teacher}
            </MenuItem>
            <MenuItem value={UserPermission.admin}>
              {UserPermission.admin}
            </MenuItem>
          </RegistryTextField>
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField
            inputRef={passwordRef}
            required
            label="密码"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField
            inputRef={idRef}
            required
            label="学号/编号"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField
            inputRef={emailRef}
            required
            label="邮箱"
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <RegistryTextField
            inputRef={avatarUrlRef}
            label="头像 URL"
            type="text"
          />
        </Grid>
        <Typography variant="body2">
          学生与教师权限需要对应的学号/编码
        </Typography>
        <Grid item xs={12} mt={1}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleRegistry}
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
          {/* <Divider variant="middle">
            <Typography variant="caption" color="text.secondary">
              第三方注册
            </Typography>
          </Divider>
          <FlexBox fullWidth column gap={1} mt={1}>
            <Button fullWidth variant="contained">
              SIGN UP with GITHUB
            </Button>
          </FlexBox> */}
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};

export default Registry;
