import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { authSelector } from "../../store/reducers/auth-reducer";
import { useAppSelector } from "../../store/store";
import defaultAva from "../../assets/img/def-image.png";
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import classes from "./Chat.module.scss";

const messages = [
  {
    _id: 2,
    user: {
      _id: "2",
      name: "max",
    },
    message: "hello",
  },
];

type ChatType = {
  active: boolean;
  setActive: (value: boolean) => void;
};

export const Chat: React.FC<ChatType> = React.memo(({ active, setActive }) => {
  const [name, setName] = useState<string>("");
  const auth = useAppSelector(authSelector);

  const userName = "";

  const userID = 1;

  // add new user
  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const setNewUser = () => {
    // dispatch(setClientNameTC(name));
    setName("");
  };

  useEffect(() => {
    messagesAncorRef.current?.scrollIntoView();
  }, [messages]);

  const messagesAncorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={active ? `${classes.chat} ${classes.active}` : classes.modal}
      onClick={() => setActive(!active)}
    >
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <h3>Ask questions</h3>
          <IconButton onClick={() => setActive(!active)}>
            <CloseSharpIcon />
          </IconButton>
        </div>

        {!userName ? (
          <div style={{ paddingTop: "20px", textAlign: "center" }}>
            <FormGroup>
              <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                <OutlinedInput
                  placeholder={"Enter your name"}
                  label="Name"
                  // {...formik.getFieldProps("email")}
                />
                {/* {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null} */}
              </FormControl>
              <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  placeholder={"Enter email"}
                  label="Email"
                  // {...formik.getFieldProps("email")}
                />
                {/* {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null} */}
              </FormControl>

              <Button
                type={"submit"}
                variant={"outlined"}
                size={"large"}
                className={classes.btn}
                color={"primary"}
                style={{ width: "50%", margin: "0 auto" }}
                // disabled={status === "loading"}
              >
                submit
              </Button>
            </FormGroup>
          </div>
        ) : (
          <div className={classes.chatContainer}>
            <div className={classes.messagesBlock}>
              {messages.map((mes) => (
                <div
                  key={mes._id}
                  className={
                    mes.user._id === userID.toString()
                      ? `${classes.message} ${classes.message_right}`
                      : `${classes.message} ${classes.message_left}`
                  }
                >
                  <img
                    src={defaultAva}
                    className={classes.avatar}
                    alt="avatar"
                  />
                  <div className={classes.messageItem}>
                    <div className={classes.nameMessage}>
                      <span className={classes.name}>{mes.user.name}</span>
                      <span className={classes.item}>{mes.message}</span>
                    </div>
                    <div className={classes.time}>
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesAncorRef}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
