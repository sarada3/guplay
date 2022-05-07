import useStorage from "../../utils/hooks/useStorage";

import { loaderAnimated } from "./Icons";

import { IUser } from "../../types";

interface UserThumbnailProps {
  user: IUser;
}

function UserThumbnail(props: UserThumbnailProps) {
  const { user } = props;
  const thumbnailSrc = useStorage(user.thumbnail);
  return thumbnailSrc === "" ? (
    <span style={{ width: "100%", height: "100%" }}>{loaderAnimated}</span>
  ) : (
    <img
      style={{ borderRadius: "999px" }}
      width="100%"
      height="100%"
      src={thumbnailSrc}
      alt="user thumbnail"
    />
  );
}

export default UserThumbnail;
