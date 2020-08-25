import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import CountdownButton from "./CountdownButton";

import useCountdown from "./useCountdown";
import { CONCAT_SERVER_URL } from "./utils";
import { selectUser, setUser } from "./redux/userSlice";

export default function App() {
  const [text, setText] = useState("");
  const [time, setTime] = useState(Math.floor(Date.now() / 1000));
  const { userId } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useCountdown();

  useEffect(() => {
    dispatch(setUser({ userId: 1 }));
    const timer = setInterval(
      () => setTime(Math.floor(Date.now() / 1000)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const onClick = () => {
    setText((prev) => `${prev} hi`);
  };

  const handleClick = () => {
    axios
      .delete(CONCAT_SERVER_URL("/"), {
        params: { id: userId },
      })
      .then(() => setCountdown(0));
  };

  return (
    <Container maxWidth="sm">
      <CountdownButton
        onClick={onClick}
        duration={10}
        countdown={countdown}
        setCountdown={setCountdown}
      >
        Click to send requests
      </CountdownButton>
      <Button variant="contained" onClick={handleClick}>
        clear
      </Button>
      <p>{text}</p>
      <p>{time}</p>
    </Container>
  );
}
