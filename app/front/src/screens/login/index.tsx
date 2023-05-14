import { AccountCircle, Lock } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { loginApi } from "../../api/userApi";
import FlexBox from "../../components/FlexBox";
import MainContainer from "../../components/MainContainer";
import { formatMessage } from "../../config/message";
import { changeAccountInfo } from "../../store/features/accountSlice";
import { BackResponseWithData } from "../../types/api";
import { checkUserName } from "../../utils/userUtils";
import LoginScene from "./LoginScene";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountRef = React.useRef<HTMLInputElement>(null!);
  const passwordRef = React.useRef<HTMLInputElement>(null!);
  const [remember, setRemember] = React.useState<boolean>(false);
  const handleSignIn = async () => {
    const account = accountRef.current.value;
    const password = passwordRef.current.value;
    if (!remember) localStorage.removeItem("userId");
    if (account.length === 0 || !password || password.length === 0) {
      alert("用户名或密码不能为空!");
      return;
    }
    if (account.includes("@") && !isEmail(account)) {
      alert("邮箱格式错误!");
      return;
    } else if (!checkUserName(account)) {
      alert(`用户名格式错误: ${formatMessage.userName}`);
      return;
    }
    console.log(`尝试登录 ${account}`);
    let promise = null;
    if (account.includes("@"))
      promise = await loginApi("email", account, password);
    else promise = await loginApi("name", account, password);
    promise
      .json()
      .then((response: BackResponseWithData) => {
        if (response.code !== 200) {
          alert(response.message);
        } else {
          const userId = response.data as string;
          if (remember) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("lastLoginDate", new Date().toDateString());
          }
          dispatch(changeAccountInfo({ userId: userId }));
          navigate("/app/account");
          console.log("登录成功");
        }
      })
      .catch((reason) => {
        alert(`发送请求失败，原因: ${reason}`);
      });
  };

  return (
    <FlexBox column fullWidth component="form" gap={2}>
      <TextField
        inputRef={accountRef}
        required
        size="small"
        fullWidth
        label="用户名 / 邮箱"
        autoComplete="email"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        inputRef={passwordRef}
        required
        size="small"
        fullWidth
        label="密码"
        autoComplete="password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={() => handleSignIn()}
        type="button"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "black",
        }}
      >
        Sign In
      </Button>
      <Grid container justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onClick={() => setRemember(!remember)}
              value="remember"
              color="primary"
            />
          }
          label="记住我"
        />
        {/* <Button>找回密码</Button> */}
      </Grid>
    </FlexBox>
  );
};

const Login: React.FC = () => {
  return (
    <MainContainer>
      <FlexBox column sx={{ height: "100vh" }}>
        <LoginScene />
        <Typography component="h1" variant="h4">
          登录
        </Typography>
        <FlexBox column fullWidth m={3}>
          <SignIn />
          <Typography variant="caption" color="text.secondary" sx={{ pt: 3 }}>
            其他登录方式
          </Typography>
          <FlexBox fullWidth column gap={1} mt={2}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to="/app/account"
            >
              以游客身份登录
            </Button>
            <Button
              component={Link}
              to="/registry"
              variant="outlined"
              fullWidth
            >
              注册新账号
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};

export default Login;
