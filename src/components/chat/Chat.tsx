import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import defaultAva from "../../assets/img/def-image.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../..";
import { appStatusSelector } from "../../store/reducers/app-reducer";
import { currentUserSelector } from "../../store/reducers/auth-reducer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import classes from "./Chat.module.scss";
import { sendNewMessageTC } from "../../store/reducers/chat-reducer";

type ChatType = {
  active: boolean;
};

export const Chat: React.FC<ChatType> = React.memo(({ active }) => {
  const [value, setValue] = useState("");

  const [messages] = useCollectionData(
    query(collection(db, "messages"), orderBy("createdAt"))
  );

  const status = useAppSelector(appStatusSelector);
  const currentUser = useAppSelector(currentUserSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    messagesAncorRef.current?.scrollIntoView();
  }, [messages]);

  const messagesAncorRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    dispatch(sendNewMessageTC(value));
    setValue("");
  };

  return (
    <div
      className={active ? `${classes.chat} ${classes.active}` : classes.modal}
    >
      {currentUser.uid && !messages && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}

      <div className={classes.chatContent}>
        <div className={classes.heading}>
          <h3>Chat with us</h3>
          <p>
            Hello! Let us know if you have a specific question, or give an idea
            of what you're looking for. We're happy to make recommendations.
          </p>
        </div>

        {!currentUser.uid ? (
          <div style={{ paddingTop: "150px", textAlign: "center" }}>
            Please sign in
          </div>
        ) : (
          <div className={classes.chatMessages}>
            <div className={classes.messagesBlock}>
              {messages &&
                messages.map(
                  (
                    mes,
                    ind //заменить на id
                  ) => (
                    <div
                      key={ind}
                      className={
                        mes.uid === currentUser.uid
                          ? `${classes.message} ${classes.message_right}`
                          : `${classes.message} ${classes.message_left}`
                      }
                    >
                      <Avatar
                        src={mes.photoURL ? mes.photoURL : defaultAva}
                        alt="avatar"
                      />
                      <div className={classes.messageItem}>
                        <div className={classes.nameMessage}>
                          <span className={classes.name}>
                            {mes.name ? mes.name : "anonymous"}
                          </span>
                          <span className={classes.item}>{mes.text}</span>
                        </div>
                        {/* <div className={classes.time}>
                          {
                            new Date(mes.createdAt.seconds * 1000)
                              .toLocaleString()
                              .split(",")[1]
                          }
                        </div> */}
                      </div>
                    </div>
                  )
                )}
              <div ref={messagesAncorRef}></div>
            </div>
            <div className={classes.textField}>
              <TextField
                fullWidth
                variant="outlined"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
              />
              <Button
                variant={"contained"}
                color={"primary"}
                style={{ marginTop: "15px" }}
                endIcon={<SendIcon />}
                disabled={status === "loading"}
                onClick={sendMessage}
              >
                send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// ==== TYPES ====
