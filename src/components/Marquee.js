import React, { useState, useEffect, useRef } from "react";
import "./Marquee.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  marquee: {
    height: "3em",
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
  },
  marqueeContainer: {
    // minWidth: "100%",
    // marginRight: "100%",
    paddingLeft: 0,
    display: "block",
    listStyleType: "none",
    position: "absolute",
  },
  child: {
    whiteSpace: "nowrap",
    // width: "100%",
    // marginRight: "100vw",
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
  const liRef = useRef(null);
  // const ulRef = useRef(null);
  const [liWidth, setliWidth] = useState(0);

  // useEffect(() => {
  //   ulRef.current.addEventListener("animationstart", () =>
  //     console.log("start")
  //   );
  //   return () =>
  //     ulRef.current.removeEventListener("animationstart", () =>
  //       console.log("remove")
  //     );
  // }, [ulRef]);

  useEffect(() => {
    setliWidth(liRef.current.offsetWidth);

    const timer = setTimeout(() => {
      setPause(true);
      setHead((prev) => (prev + 1) % children.length);
    }, ((window.innerWidth + liRef.current.offsetWidth) / 200) * 1000);

    setPause(false);
    return () => clearTimeout(timer);
  }, [head, window.innerWidth]);

  return (
    <>
      <div className={classes.marquee}>
        <ul
          key={head}
          className={clsx(classes.marqueeContainer, { [classes.pause]: pause })}
          style={{
            animation: `marquee ${
              (window.innerWidth + liWidth) / 200
            }s linear 1`,
          }}
          // ref={ulRef}
        >
          <li className={classes.child} ref={liRef}>
            {children[head]}
          </li>
        </ul>
      </div>
      <p>current speed {(window.innerWidth + liWidth) / 200}</p>
      <p>li width {liWidth}</p>
      <p>window width {window.innerWidth}</p>
    </>
  );
}
