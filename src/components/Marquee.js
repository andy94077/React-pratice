import React, { useState, useEffect } from "react";
import "./Marquee.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  marquee: {
    height: "3em",
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
  },
  marqueeContainer: {
    paddingLeft: 0,
    display: "flex",
    listStyleType: "none",
    position: "absolute",
  },
  child: {
    whiteSpace: "nowrap",
    marginRight: "100vw",
  },
  lastChild: {
    whiteSpace: "nowrap",
  },
}));

export default function Marquee(props) {
  const { children, seconds = 5 } = props;
  const classes = useStyles();
  const [head, setHead] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setHead((prev) => (prev + 1) % children.length);
    }, seconds * 1000);
  }, [head]);

  return (
    <div className={classes.marquee}>
      <ul
        className={classes.marqueeContainer}
        style={{ animation: `marquee ${seconds}s linear infinite` }}
      >
        <li className={classes.lastChild}>{children[head]}</li>
      </ul>
    </div>
  );
}
