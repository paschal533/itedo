// @ts-nocheck
import React, { useContext } from "react";
import darkLogo from "../../imgs/logo-dark.png";
import lightLogo from "../../imgs/logo-light.png";
import { ThemeContext } from "../../App";

export const Loader = () => {
  let { theme } = useContext(ThemeContext)

  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <img alt="Logo" src={theme == "light" ? darkLogo : lightLogo} />
      </div>
      <p className="text-sm text-muted-foreground">Itedo223 is thinking...</p>
    </div>
  );
};