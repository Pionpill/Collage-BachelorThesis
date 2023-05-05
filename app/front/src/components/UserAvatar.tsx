import { Avatar } from "@mui/material";
import { UserSexual } from "../models/User";
import Degree, { iconSizeSelector } from "../styles/degree";
import { getColorBySexual } from "../utils/userUtils";

export interface UserAvatarParams {
  name: string;
  sexual?: UserSexual;
  headIcon?: string;
  size?: Degree;
}

const UserAvatar: React.FC<UserAvatarParams> = ({
  name,
  sexual,
  headIcon,
  size,
}) => {
  const stringAvatar = (name: string) => {
    if (size && ["lg", "xl", "xxl"].includes(size)) return name.slice(0, 2);
    else return name.slice(0, 1);
  };
  const iconSize = iconSizeSelector(size);

  return (
    <Avatar
      src={headIcon}
      alt={name}
      sx={{
        bgcolor: getColorBySexual(sexual ? sexual : UserSexual.undefined),
        width: iconSize,
        height: iconSize,
        fontSize: iconSize / 3,
      }}
    >
      {!headIcon && stringAvatar(name)}
    </Avatar>
  );
};

export default UserAvatar;
