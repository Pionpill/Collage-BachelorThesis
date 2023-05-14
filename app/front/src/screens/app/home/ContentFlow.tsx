import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
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
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getLatestModelApi,
  getModelLikeCountsApi,
  getRecommendModelApi,
  getSubscribeModelApi,
  isModelLikedByUserApi,
  ModelApiType,
  searchModelsByTitleApi,
} from "../../../api/modelApi";
import { getUserById } from "../../../api/userApi";
import FlexBox from "../../../components/FlexBox";
import UserAvatar from "../../../components/UserAvatar";
import { presetModels } from "../../../data/threeModel";
import ThreeModelShort, {
  ThreeModelShortFields,
} from "../../../models/ThreeModelShort";
import User from "../../../models/User";
import { UserShortFields } from "../../../models/UserShort";
import { RootState } from "../../../store";
import { HomeTab } from "../../../store/features/homeSlice";

const GridItem: React.FC<{ model: ThreeModelShort }> = ({ model }) => {
  const [like, setLike] = React.useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.account.userId);

  React.useState(() => {
    const setLikeCondition = async () => {
      if (userId === "visitor") return;
      const promise = isModelLikedByUserApi(model.id, userId);
      (await promise).json().then((response) => {
        setLike(response.data);
      });
    };
    setLikeCondition();
  });
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
                    {like ? (
                      <ThumbUp fontSize="small" />
                    ) : (
                      <ThumbUpOutlined fontSize="small" />
                    )}
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
  const tab = useSelector((root: RootState) => root.home.tab);
  const userId = useSelector((root: RootState) => root.account.userId);
  const searchContext = useSelector((root: RootState) => root.home.search);
  const [models, setModels] =
    React.useState<Array<ThreeModelShort>>(presetModels);

  const modelAdapter = async (modelApiDates: Array<ModelApiType>) => {
    const resultModels: ThreeModelShort[] = [];
    if (!modelApiDates) return [];
    for (let modelApiDate of modelApiDates) {
      const author = (await getUserById(String(modelApiDate.authorId))) as User;
      const likeCount = (
        await (await getModelLikeCountsApi(String(modelApiDate.id))).json()
      ).data;
      const modelData: ThreeModelShortFields = {
        id: String(modelApiDate.id),
        createTime: new Date(modelApiDate.createTime),
        updateTime: new Date(modelApiDate.updateTime),
        coverUrl: modelApiDate.coverUrl,
        title: modelApiDate.title,
        likeCount: likeCount,
      };
      const userData: UserShortFields = {
        id: author.id,
        name: author.name,
        avatarUrl: author.avatarUrl,
      };
      const threeModelShort = ThreeModelShort.fromJson(modelData, userData);
      resultModels.push(threeModelShort);
    }
    return resultModels;
  };
  const initModels = async () => {
    let promise;
    let data: ModelApiType[] = [];
    if (searchContext) promise = searchModelsByTitleApi(searchContext);
    else {
      if (tab === HomeTab.recommend) promise = getRecommendModelApi();
      if (tab === HomeTab.new) promise = getLatestModelApi();
      if (tab === HomeTab.star) promise = getSubscribeModelApi(userId);
    }
    if (promise) data = (await (await promise).json()).data;
    const modelsArray = await modelAdapter(data);
    // return modelsArray;
    setModels(modelsArray);
  };

  React.useEffect(() => {
    if (userId !== "visitor") initModels();
  }, [tab, searchContext]);

  return (
    <Grid container spacing={1} overflow="auto">
      {models.map((model) => {
        const realModel = model as ThreeModelShort;
        return <GridItem model={realModel} />;
      })}
    </Grid>
  );
};

export default ContentFlow;
