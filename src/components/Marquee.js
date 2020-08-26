import React, { useState, useEffect, useRef } from "react";
import "./Marquee.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import useWindowSize from "../useWindowSize";

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
  },
  pause: {
    animationPlayState: "paused",
  },
}));

export default function Marquee(props) {
  const { children } = props;
  const classes = useStyles();
  const [head, setHead] = useState(0);
  const [pause, setPause] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const ulRef = useRef(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width === undefined) return () => {};
    const ul = ulRef.current;
    const moveHead = () => {
      setHead((prev) => (prev + 1) % children.length);
      setRefresh((prev) => !prev);
      setPause(true);
    };

    ul.style.animation = `marquee ${
      (width + ul.offsetWidth) / 200
    }s linear infinite`;

    ul.addEventListener("animationiteration", moveHead);
    setPause(false);
    return () => ul.removeEventListener("animationiteration", moveHead);
  }, [refresh, width]);

  return (
    <>
      <div className={classes.marquee}>
        <ul
          key={head}
          className={clsx(classes.marqueeContainer, { [classes.pause]: pause })}
          ref={ulRef}
        >
          <li className={classes.child}>{children[head]}</li>
        </ul>
      </div>
    </>
  );
}
