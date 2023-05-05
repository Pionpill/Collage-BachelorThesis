import { ThumbUpOutlined } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FlexBox from "../../../components/FlexBox";
import UserAvatar from "../../../components/UserAvatar";
import {
  threeModelBench,
  threeModelLight,
  threeModelMaple,
  threeModelShortKamdo,
  threeModelShortMac,
  threeModelShortShoes,
} from "../../../data/threeModel";
import ThreeModelShort from "../../../models/ThreeModelShort";

const GridItem: React.FC<{ model: ThreeModelShort }> = ({ model }) => {
  return (
    <Grid
      item
      xs={6}
      md={4}
      component={Link}
      to={`/app/home/model=${model.id}`}
      sx={{ textDecoration: "none" }}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={model.coverUrl}
            alt="封面图"
          />
          <CardContent sx={{ p: 1, display: "flex", width: "100%" }}>
            <Stack sx={{ width: "100%" }}>
              <Typography variant="body2" noWrap>
                {model.title}
              </Typography>
              <FlexBox justify="space-between" gap={1}>
                <FlexBox gap={1}>
                  <UserAvatar
                    name={model.author.name}
                    headIcon={model.author.avatarUrl}
                    size="xxs"
                  />
                  <Typography variant="caption" noWrap sx={{ opacity: 0.5 }}>
                    {model.author.name}
                  </Typography>
                </FlexBox>
                <FlexBox>
                  <IconButton>
                    <ThumbUpOutlined fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" sx={{ opacity: 0.5 }}>
                    {model.likeCount > 999
                      ? "999+"
                      : model.likeCount > 99
                      ? "99+"
                      : model.likeCount}
                  </Typography>
                </FlexBox>
              </FlexBox>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const ContentFlow: React.FC = () => {
  return (
    <Grid container spacing={1} overflow="auto">
      <GridItem model={threeModelShortKamdo} />
      <GridItem model={threeModelShortMac} />
      <GridItem model={threeModelShortShoes} />
      <GridItem model={threeModelBench} />
      <GridItem model={threeModelMaple} />
      <GridItem model={threeModelLight} />
    </Grid>
  );
};

export default ContentFlow;
