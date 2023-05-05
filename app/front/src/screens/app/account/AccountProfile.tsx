import { EditNote } from "@mui/icons-material";
import { Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import UserAvatar from "../../../components/UserAvatar";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
import User from "../../../models/User";
import {
  getColorByPermission,
  getIconByPermission,
  getIconBySexual,
} from "../../../utils/userUtils";

const AccountProfile: React.FC = () => {
  const userState: User = useCurrentAccount();
  return (
    <Stack gap={1}>
      <Grid container gap={2}>
        <Grid item>
          <UserAvatar
            name={userState.name}
            sexual={userState.sexual}
            size="xxl"
            headIcon={userState.avatarUrl}
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
              {getIconByPermission(userState.permission)}
              <Typography variant="h6" color="text.primary">
                {userState.name}
              </Typography>
              {getIconBySexual(userState.sexual)}
            </FlexBox>
            <FlexBox gap={1}>
              <Chip
                label={userState.id}
                size="small"
                sx={{
                  borderRadius: 1,
                  bgColor: getColorByPermission(userState.permission),
                  fontSize: ".5em",
                }}
              />
              <Chip
                label="大四"
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
              南京信息工程大学 {userState.college && ` / ${userState.college}`}
              {userState.department && ` / ${userState.department}`}
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
      {/* TODO API 获取个性签名 */}
      <FlexBox justify="flex-start" gap={0}>
        <IconButton size="small">
          <EditNote />
        </IconButton>
        <Typography variant="body1" color="text.primary" noWrap>
          {userState.signature}
        </Typography>
      </FlexBox>
    </Stack>
  );
};

export default AccountProfile;
