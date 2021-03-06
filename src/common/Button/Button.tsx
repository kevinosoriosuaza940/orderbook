import React from "react";

import classes from "./Button.module.css";

export default function Button({
  text,
  icon,
  type = "main",
  ...props
}: {
  text: string;
  icon?: JSX.Element;
  type?: "main" ;
  [x: string]: any;
}): JSX.Element {
  return (
    <button className={`${classes.button} ${classes[type]}`} {...props}>
      {icon}
      <span className={classes.text}>{text}</span>
    </button>
  );
}
