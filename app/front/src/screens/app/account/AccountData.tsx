import { ViewInAr } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ModelApiType } from "../../../api/modelApi";
import {
  getUserCollectionCountsApi,
  getUserCollectionsApi,
  getUserFollowerCountsApi,
  getUserFollowersApi,
  getUserSubscribeCountsApi,
  getUserSubscribesApi,
  unSubscribeUserApi,
  UserApiType,
} from "../../../api/userApi";
import FlexBox from "../../../components/FlexBox";
import { RootState } from "../../../store";
import { halfOpacitySx } from "../../../styles/macro";
import { formatDate, formatLastUpdateTimeSpan } from "../../../utils/dateUtils";

const CollectionDialog: React.FC<{ setCollectionOpen: Function }> = ({
  setCollectionOpen,
}) => {
  const [collections, setCollections] = React.useState<ModelApiType[] | null>(
    null
  );
  const userId = useSelector((state: RootState) => state.account.userId);
  const navigate = useNavigate();
  const initCollections = async () => {
    const promise = getUserCollectionsApi(userId);
    (await promise).json().then((response) => {
      setCollections(response.data);
    });
  };
  React.useState(() => {
    initCollections();
  });
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>收藏列表</DialogTitle>
      <DialogContent>
        <FlexBox fullWidth maxWidth="50vh" column gap={1}>
          {collections &&
            collections.map((collection: ModelApiType) => {
              return (
                <>
                  <FlexBox fullWidth justify="space-between">
                    <FlexBox
                      justify="flex-start"
                      gap={1}
                      onClick={() =>
                        navigate(`/app/home/model=${collection.id}`)
                      }
                    >
                      <Avatar
                        src={collection.coverUrl}
                        sx={{ borderRadius: "8px" }}
                      />
                      <FlexBox column align="flex-start">
                        <Typography>{collection.title}</Typography>
                        <Typography sx={halfOpacitySx} variant="caption">
                          {`${formatDate(
                            new Date(collection.createTime),
                            "d"
                          )} ${formatLastUpdateTimeSpan(
                            new Date(collection.updateTime)
                          )}更新`}
                        </Typography>
                      </FlexBox>
                    </FlexBox>
                    <IconButton
                      onClick={() =>
                        navigate(`/app/identify/model=${collection.id}`)
                      }
                    >
                      <ViewInAr />
                    </IconButton>
                  </FlexBox>
                  <Divider sx={{ width: "100%" }} />
                </>
              );
            })}
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setCollectionOpen(false)}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SubscribeDialog: React.FC<{ setSubscribeOpen: Function }> = ({
  setSubscribeOpen,
}) => {
  const [subscribes, setSubscribes] = React.useState<UserApiType[] | null>(
    null
  );
  const [count, setCount] = React.useState<number>(0);
  const userId = useSelector((state: RootState) => state.account.userId);
  const initSubscribes = async () => {
    const promise = getUserSubscribesApi(userId);
    (await promise).json().then((response) => {
      setSubscribes(response.data);
      console.log(response);
    });
  };
  React.useEffect(() => {
    initSubscribes();
  }, [count]);
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>关注列表</DialogTitle>
      <DialogContent>
        <FlexBox fullWidth maxWidth="50vh" column gap={1}>
          {subscribes &&
            subscribes.map((user: UserApiType) => {
              return (
                <>
                  <FlexBox fullWidth justify="space-between">
                    <FlexBox justify="flex-start" gap={1}>
                      <Avatar
                        src={user.avatarUrl}
                        sx={{ borderRadius: "8px" }}
                      />
                      <FlexBox column align="flex-start">
                        <Typography>{user.name}</Typography>
                        <Typography sx={halfOpacitySx} variant="caption">
                          {user.signature}
                        </Typography>
                      </FlexBox>
                    </FlexBox>
                    <Button
                      color="warning"
                      onClick={(event) => {
                        unSubscribeUserApi(user.id, userId);
                        setCount(count + 1);
                        console.log(event);
                      }}
                    >
                      取关
                    </Button>
                  </FlexBox>
                  <Divider sx={{ width: "100%" }} />
                </>
              );
            })}
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setSubscribeOpen(false);
            if (count !== 0) window.location.reload();
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FollowerDialog: React.FC<{ setFollowerOpen: Function }> = ({
  setFollowerOpen,
}) => {
  const [followers, setFollowers] = React.useState<UserApiType[] | null>(null);
  const userId = useSelector((state: RootState) => state.account.userId);
  const initFollowers = async () => {
    const promise = getUserFollowersApi(userId);
    (await promise).json().then((response) => {
      setFollowers(response.data);
    });
  };
  React.useEffect(() => {
    initFollowers();
  }, []);
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>粉丝列表</DialogTitle>
      <DialogContent>
        <FlexBox fullWidth maxWidth="50vh" column gap={1}>
          {followers &&
            followers.map((user: UserApiType) => {
              return (
                <>
                  <FlexBox fullWidth justify="space-between">
                    <FlexBox justify="flex-start" gap={1}>
                      <Avatar
                        src={user.avatarUrl}
                        sx={{ borderRadius: "8px" }}
                      />
                      <FlexBox column align="flex-start">
                        <Typography>{user.name}</Typography>
                        <Typography sx={halfOpacitySx} variant="caption">
                          {user.signature}
                        </Typography>
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                  <Divider sx={{ width: "100%" }} />
                </>
              );
            })}
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setFollowerOpen(false);
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// TODO 调 API 获取实际数据
const AccountData: React.FC = () => {
  const [collectionCount, setCollectionCount] = React.useState<number>(0);
  const [subscribeCount, setSubscribeCount] = React.useState<number>(0);
  const [followerCount, setFollowerCount] = React.useState<number>(0);
  const [collectionOpen, setCollectionOpen] = React.useState<boolean>(false);
  const [subscribeOpen, setSubscribeOpen] = React.useState<boolean>(false);
  const [followerOpen, setFollowerOpen] = React.useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.account.userId);
  const initCollectionCount = async () => {
    const promise = getUserCollectionCountsApi(userId);
    (await promise)
      .json()
      .then((response) => setCollectionCount(response.data));
  };
  const initSubscribeCount = async () => {
    const promise = getUserSubscribeCountsApi(userId);
    (await promise).json().then((response) => setSubscribeCount(response.data));
  };
  const initFollowerCount = async () => {
    const promise = getUserFollowerCountsApi(userId);
    (await promise).json().then((response) => setFollowerCount(response.data));
  };
  React.useEffect(() => {
    initCollectionCount();
    initSubscribeCount();
    initFollowerCount();
  }, [userId]);

  return (
    <>
      <Grid container justifyContent="space-around">
        <Grid item>
          <FlexBox column onClick={() => setCollectionOpen(true)}>
            <Typography color="text.primary" variant="h6">
              {collectionCount}
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
          <FlexBox column onClick={() => setSubscribeOpen(true)}>
            <Typography color="text.primary" variant="h6">
              {subscribeCount}
            </Typography>
            <Typography
              color="text.primary"
              variant="caption"
              sx={{ opacity: 0.5 }}
            >
              关注
            </Typography>
          </FlexBox>
        </Grid>
        <Grid item>
          <FlexBox column onClick={() => setFollowerOpen(true)}>
            <Typography color="text.primary" variant="h6">
              {followerCount}
            </Typography>
            <Typography
              color="text.primary"
              variant="caption"
              sx={{ opacity: 0.5 }}
            >
              粉丝
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
      {collectionOpen && (
        <CollectionDialog setCollectionOpen={setCollectionOpen} />
      )}
      {subscribeOpen && <SubscribeDialog setSubscribeOpen={setSubscribeOpen} />}
      {followerOpen && <FollowerDialog setFollowerOpen={setFollowerOpen} />}
    </>
  );
};

export default AccountData;
