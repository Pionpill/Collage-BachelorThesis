import { Grid, Typography } from "@mui/material";
import FlexBox from "../../../components/FlexBox";

// TODO 调 API 获取实际数据
const AccountData: React.FC = () => {
  return (
    <Grid container justifyContent="space-around">
      <Grid item>
        <FlexBox column>
          <Typography color="text.primary" variant="h6">
            15
          </Typography>
          <Typography
            color="text.primary"
            variant="caption"
            sx={{ opacity: 0.5 }}
          >
            收藏
          </Typography>
        </FlexBox>
      </Grid>
      <Grid item>
        <FlexBox column>
          <Typography color="text.primary" variant="h6">
            15
          </Typography>
          <Typography
            color="text.primary"
            variant="caption"
            sx={{ opacity: 0.5 }}
          >
            好友
          </Typography>
        </FlexBox>
      </Grid>
      <Grid item>
        <FlexBox column>
          <Typography color="text.primary" variant="h6">
            15
          </Typography>
          <Typography
            color="text.primary"
            variant="caption"
            sx={{ opacity: 0.5 }}
          >
            动态
          </Typography>
        </FlexBox>
      </Grid>
    </Grid>
  );
};

export default AccountData;
