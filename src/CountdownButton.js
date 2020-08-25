import React, { useEffect } from "react";
import axios from "axios";
import { Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

import CircularProgressWithLabel from "./CircularProgressWithLabel";

import { CONCAT_SERVER_URL } from "./utils";
import { selectUser } from "./redux/userSlice";

const useStyles = makeStyles(() => ({
  button: {
    margin: "10px auto",
    display: "flex",
    alignContent: "center",
    borderRadius: 15,
  },
  buttonDisabled: {
    border: "1px solid #aaa !important",
    backgroundColor: "#eee !important",
  },
}));

export default function CountdownButton(props) {
  const classes = useStyles();
  const { userId } = useSelector(selectUser);
  const { children, onClick, duration = 10, countdown, setCountdown } = props;

  useEffect(() => {
    if (userId === null) return;
    axios
      .get(CONCAT_SERVER_URL("/"), { params: { id: userId } })
      .then((res) => {
        const remainedTime =
          Number(res.data.expired_time) - Math.floor(Date.now() / 1000);
        setCountdown(remainedTime);
      })
      .catch(() => setCountdown(0));
  }, [userId]);

  const handleClick = (e) => {
    if (countdown !== 0) return;
    const nextExpiredTime = Math.floor(Date.now() / 1000) + duration;
    axios.post(CONCAT_SERVER_URL("/"), {
      id: userId,
      expired_time: nextExpiredTime,
    });

    setCountdown(duration);
    onClick(e);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={countdown > 0}
      classes={{ root: classes.button, disabled: classes.buttonDisabled }}
      onClick={handleClick}
      endIcon={
        countdown > 0 && (
          <CircularProgressWithLabel value={countdown} total={duration} />
        )
      }
      size="large"
    >
      {countdown > 0 ? (
        <span style={{ marginRight: 3, color: "#777" }}>Wait for</span>
      ) : (
        children
      )}
    </Button>
  );
}
