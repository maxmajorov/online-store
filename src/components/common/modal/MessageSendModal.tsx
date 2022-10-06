import React, { useState } from "react";
import Button from "@mui/material/Button";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../../store/store";
import { appStatusSelector } from "../../../store/reducers/app-reducer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
  isMessageSend: boolean;
};

export const MessageSendModal: React.FC<PropsType> = ({ isMessageSend }) => {
  const [open, setOpen] = useState(isMessageSend);
  console.log(isMessageSend, open);
  const status = useAppSelector(appStatusSelector);

  const onCloseHandler = () => {
    setOpen(false);
  };

  return (
    <UniversalModal status={status} open={open} setOpen={setOpen}>
      <div>
        <div style={{ position: "relative", textAlign: "center" }}>
          Thanks for your order. The manager will contact you shortly
        </div>
        <div style={{ position: "absolute", top: "0", right: "0" }}>
          <IconButton aria-label="close-modal" onClick={onCloseHandler}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </UniversalModal>
  );
};
