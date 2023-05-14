import { MenuItem } from "@mui/material";

const booleanMenuArray = [
  { value: 1, label: "是" },
  { value: 0, label: "否" },
];

export const BooleanMenuItems: React.FC = () => (
  <>
    {booleanMenuArray.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </>
);

const bgPresetMenuArray = [
  { value: "sunset", label: "日落" },
  { value: "dawn", label: "黄昏" },
  { value: "night", label: "夜晚" },
  { value: "warehouse", label: "仓库" },
  { value: "forest", label: "森林" },
  { value: "apartment", label: "公寓" },
  { value: "studio", label: "工作室" },
  { value: "city", label: "城市" },
  { value: "park", label: "公园" },
  { value: "lobby", label: "礼堂" },
];

export const BgPresetMenuItems: React.FC = () => (
  <>
    {bgPresetMenuArray.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </>
);
