// @ts-nocheck
import React from "react";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, UserContext } from "../../App";
import { Avatar, AvatarImage } from "./avatar";
import darkLogo from "../../imgs/logo-dark.png";
import lightLogo from "../../imgs/logo-light.png";

export const BotAvatar = () => {
  let {theme } = useContext(ThemeContext)
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage className="" src={theme == "light" ? darkLogo : lightLogo} />
    </Avatar>
  );
};