import React, { useCallback, useEffect } from "react";
import { authSelector } from "../../store/reducers/auth-reducer";
import { useAppSelector } from "../../store/store";
import classes from "./Chat.module.scss";

type ChatType = {
  active: boolean;
  setActive: (value: boolean) => void;
};

export const Chat: React.FC<ChatType> = React.memo(({ active, setActive }) => {
  const auth = useAppSelector(authSelector);

  return (
    <div
      className={active ? `${classes.chat} ${classes.active}` : classes.modal}
      onClick={() => setActive(!active)}
    >
      <h3>CHAT</h3>
    </div>
  );
});
