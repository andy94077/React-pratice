import React from "react";
import { Button, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  button: {
    margin: "10px auto",
    display: "block",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Button variant="contained" color="secondary" className={classes.button}>
        Learn React
      </Button>
    </Container>
  );
}
