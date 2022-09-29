import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classes from "./Counter.module.scss";

type CounterPropsType = {
  count: number;
  setCount: (count: number) => void;
};

export const Counter: React.FC<CounterPropsType> = ({ count, setCount }) => {
  return (
    <div className={classes.counter}>
      <ButtonGroup>
        <Button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <div className={classes.field}>{count}</div>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};
