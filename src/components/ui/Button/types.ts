import React from "react"

export interface IButtonProps {
  variant: "default" | "outline";
  children?: React.ReactNode;
  text?: string;
  type: "button" | "link";
  href?: string
}
