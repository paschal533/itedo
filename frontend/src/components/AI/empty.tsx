import React from "react";
// @ts-ignore
import emp from "../../imgs/empty.png";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative h-40 w-40">
        <img src={emp} alt="Empty" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};