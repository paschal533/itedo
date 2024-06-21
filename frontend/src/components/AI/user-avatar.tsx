import React, { useContext } from "react";
import { UserContext } from "../../App";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const UserAvatar = () => {
// @ts-ignore
let { userAuth: { access_token, email, profile_img, name }} = useContext(UserContext);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={profile_img} />
      <AvatarFallback>
        {name}
      </AvatarFallback>
    </Avatar>
  );
};