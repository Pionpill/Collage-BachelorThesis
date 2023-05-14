import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  changeSearch,
  changeTag,
  HomeTab,
} from "../../../store/features/homeSlice";

const SearchBar: React.FC = () => {
  const searchRef = React.useRef<HTMLInputElement>(null!);
  const dispatch = useDispatch();
  return (
    <Paper
      component="form"
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Models"
        inputRef={searchRef}
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={() => dispatch(changeSearch(searchRef.current.value))}
      >
        <Search />
      </IconButton>
      {/* <Divider orientation="vertical" />
      <IconButton color="info" aria-label="directions">
        <LocalOfferOutlined />
      </IconButton> */}
    </Paper>
  );
};

const TabBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTab: HomeTab = useSelector(
    (state: RootState) => state.home.tab
  );
  const onChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeTag(newValue as HomeTab));
  };

  return (
    <Tabs onChange={onChange} value={selectedTab} variant="fullWidth">
      <Tab label="为你推荐" value={HomeTab.recommend} />
      <Tab label="最新更新" value={HomeTab.new} />
      <Tab label="我的关注" value={HomeTab.star} />
    </Tabs>
  );
};

const SelectBar: React.FC = () => {
  return (
    <Stack width="100%">
      <SearchBar />
      <TabBar />
    </Stack>
  );
};

export default SelectBar;
