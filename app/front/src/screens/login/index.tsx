import { AccountCircle, Lock } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import FlexBox from "../../components/FlexBox";
import MainContainer from "../../components/MainContainer";
import { isEmail, isPassword, isUserName } from "../../utils/userUtils";
import LoginScene from "./LoginScene";

const SignIn: React.FC = () => {
  const accountRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const handleSignIn = () => {
    const account = accountRef.current.value;
    const password = passwordRef.current.value;
    if (account.length === 0 || password.length === 0) {
      alert("用户名和密码不能为空!");
      return;
    }
    if (!account.includes("@") && !isUserName(account)) {
      alert("用户名格式错误，长度 4-16，仅能包含字母，数字，下划线!");
      return;
    } else if (!isEmail(account)) {
      alert("邮箱格式错误!");
      return;
    }
    if (!isPassword(password)) {
      alert("密码格式错误，密码长度为 8-32，必须包含数字和字母!");
    }
    // TODO
    console.log("向后端发送数据");
  };

  return (
    <FlexBox column fullWidth component="form" gap={2}>
      <TextField
        ref={accountRef}
        required
        size="small"
        fullWidth
        label="用户名 / 邮箱"
        autoComplete="email"
        type="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        ref={passwordRef}
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
        onClick={handleSignIn}
        type="submit"
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
          control={<Checkbox value="remember" color="primary" />}
          label="记住我"
        />
        <Button>找回密码</Button>
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
          <Divider variant="fullWidth">
            <Typography variant="caption" color="text.secondary">
              其他登录方式
            </Typography>
          </Divider>
          <FlexBox fullWidth column gap={1} mt={2}>
            <Button fullWidth variant="outlined">
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
