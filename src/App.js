import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import CountdownButton from "./CountdownButton";

import useCountdown from "./useCountdown";
import { CONCAT_SERVER_URL } from "./utils";
import { selectUser, setUser } from "./redux/userSlice";
import Marquee from "./components/Marquee";

export default function App() {
  const [text, setText] = useState("");
  const [marqueeList, setMarqueeList] = useState([
    "111111111111111111111",
    "222222222222222222222",
    "333333333333333333333",
  ]);
  const [time, setTime] = useState(Math.floor(Date.now() / 1000));
  const { userId } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useCountdown();
  const buttonRef = useRef();

  useEffect(() => {
    dispatch(setUser({ userId: 1 }));
    const timer = setInterval(
      () => setTime(Math.floor(Date.now() / 1000)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => setText(e.target.value);
  const handleKeyUp = (e) => {
    if (e.key === "Enter") buttonRef.current.click();
  };

  const onClick = () => {
    setMarqueeList((list) => list.concat(text));
    setText("");
  };

  const handleClick = () => {
    axios
      .delete(CONCAT_SERVER_URL("/"), {
        params: { id: userId },
      })
      .then(() => setCountdown(0));
  };

  return (
    <>
      <Marquee>{marqueeList}</Marquee>
      <Container maxWidth="sm">
        <TextField
          label="marquee text"
          value={text}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <CountdownButton
          onClick={onClick}
          duration={0}
          countdown={countdown}
          setCountdown={setCountdown}
          buttonRef={buttonRef}
        >
          Click to send requests
        </CountdownButton>
        <Button variant="contained" onClick={handleClick}>
          clear
        </Button>
        <p>{time}</p>
        <ol>
          {marqueeList.map((item) => (
            <li>{item}</li>
          ))}
        </ol>
      </Container>
    </>
  );
}
