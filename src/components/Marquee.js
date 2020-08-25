import React from "react";
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
    animation: "marquee 5s linear infinite",
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
  const { children } = props;
  const classes = useStyles();
  // const [head, setHead] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setHead((prev) => (prev + 1) % children.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className={classes.marquee}>
      <ul className={classes.marqueeContainer}>
        {children.map((item, index) =>
          index === children.length - 1 ? (
            <li className={classes.lastChild}>{item}</li>
          ) : (
            <li className={classes.child}>{item}</li>
          )
        )}
      </ul>
    </div>
  );
}
