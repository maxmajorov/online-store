import React, { useState } from "react";
import Button from "@mui/material/Button";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../../store/store";
import { appStatusSelector } from "../../../store/reducers/app-reducer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type TSignInRequestModal = {
  isMessageSend: boolean;
};

export const SignInRequestModal: React.FC<TSignInRequestModal> = ({
  isMessageSend,
}) => {
  const [open, setOpen] = useState(isMessageSend);

  const status = useAppSelector(appStatusSelector);

  const onCloseHandler = () => {
    setOpen(false);
  };

  return (
    <UniversalModal status={status} open={open} setOpen={setOpen}>
      signin
    </UniversalModal>
  );
};
