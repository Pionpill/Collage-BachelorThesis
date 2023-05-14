import { EditNote } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { updateSignatureApi } from "../../../api/userApi";
import FlexBox from "../../../components/FlexBox";
import UserAvatar from "../../../components/UserAvatar";
import { userVisitor } from "../../../data/user";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
import User from "../../../models/User";
import { RootState } from "../../../store";
import {
  getColorByPermission,
  getIconByPermission,
  getIconBySexual,
} from "../../../utils/userUtils";

const AccountProfile: React.FC = () => {
  const [account, setAccount] = React.useState<User>(userVisitor);
  const [open, setOpen] = React.useState<boolean>(false);
  const signRef = React.useRef<HTMLButtonElement>(null!);
  const userId = useSelector((state: RootState) => state.account.userId);
  const changeSign = async () => {
    const signature = signRef.current.value;
    (await updateSignatureApi(userId, signature)).json().then((response) => {
      if (response.code === 200) {
        alert("修改签名成功");
        window.location.reload();
      } else {
        alert(`修改签名失败: ${response.message}`);
      }
    });
  };
  const promise = useCurrentAccount();
  useMemo(() => {
    promise.then((user) => {
      setAccount(user);
    });
  }, [account.id]);
  return (
    <Stack gap={1}>
      <Grid container gap={2}>
        <Grid item>
          <UserAvatar
            name={account.name}
            sexual={account.sexual}
            size="xxl"
            headIcon={account.avatarUrl}
          />
        </Grid>
        <Grid item>
          <FlexBox
            column
            align="flex-start"
            justify="space-between"
            style={{ height: "100%" }}
          >
            <FlexBox gap={1}>
              {getIconByPermission(account.permission)}
              <Typography variant="h6" color="text.primary">
                {account.name}
              </Typography>
              {getIconBySexual(account.sexual)}
            </FlexBox>
            <FlexBox gap={1}>
              <Chip
                label={account.id}
                size="small"
                sx={{
                  borderRadius: 1,
                  bgColor: getColorByPermission(account.permission),
                  fontSize: ".5em",
                }}
              />
              <Chip
                label={account.tags}
                size="small"
                sx={{
                  fontSize: ".5em",
                }}
              />
            </FlexBox>
            <Typography
              variant="caption"
              color="text.primary"
              sx={{ opacity: 0.5 }}
            >
              南京信息工程大学 {account.college && ` / ${account.college}`}
              {account.department && ` / ${account.department}`}
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
      <FlexBox justify="flex-start" gap={0}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <EditNote />
        </IconButton>
        <Typography variant="body1" color="text.primary" noWrap>
          {account.signature}
        </Typography>
      </FlexBox>
      <Dialog open={open} fullWidth>
        <DialogTitle>修改签名</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            inputRef={signRef}
            multiline
            rows={5}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeSign}>确定</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AccountProfile;
