import {
  DarkModeOutlined,
  LightModeOutlined,
  PaletteOutlined,
} from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useThemeChoice from "../../../hooks/useThemeChoice";
import { RootState } from "../../../store";
import { toggleTheme } from "../../../store/features/appSlice";

const HeadSetting: React.FC = () => {
  const dispatch = useDispatch();
  const modeIcon = useThemeChoice(<LightModeOutlined />, <DarkModeOutlined />);
  return (
    <Grid container justifyContent="flex-end" color="text.secondary">
      <Grid item alignItems="center" sx={{ display: "flex" }}>
        <Typography>
          {useSelector((state: RootState) => state.app.theme)} mode
        </Typography>
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {modeIcon}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton color="inherit">
          <PaletteOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default HeadSetting;
