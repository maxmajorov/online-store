import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classes from "./Counter.module.scss";
import { useAppDispatch } from "../../../store/store";
import { setCountAC } from "../../../store/reducers/cart-reducer";

type CounterPropsType = {
  id: string;
  count: number;
  setCount: (count: number) => void;
};

export const Counter: React.FC<CounterPropsType> = ({
  id,
  count,
  setCount,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.counter}>
      <ButtonGroup>
        <Button
          onClick={() => {
            setCount(count - 1);
            dispatch(setCountAC({ id, count: --count }));
          }}
          disabled={count === 1}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <div className={classes.field}>{count}</div>
        <Button
          onClick={() => {
            setCount(count + 1);
            dispatch(setCountAC({ id, count: ++count }));
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};
