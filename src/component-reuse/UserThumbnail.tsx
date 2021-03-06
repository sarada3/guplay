import { loaderAnimated } from "../assets/icons";

import useStorage from "../utils/hooks/useStorage";

import { IUser } from "../types";

interface UserThumbnailProps {
  user: IUser;
}

function UserThumbnail(props: UserThumbnailProps) {
  const { user } = props;
  const thumbnailSrc = useStorage(user.thumbnail);
  if (thumbnailSrc === "") {
    return null;
  }
  return (
    <img
      style={{ borderRadius: "999px" }}
      width="100%"
      height="100%"
      src={thumbnailSrc}
      alt={user.name}
    />
  );
}
export default UserThumbnail;
