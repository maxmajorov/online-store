import React from "react";
import { Button } from "@mui/material";
import { Grade } from "../grade/Grade";
import classes from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <h1>Car models</h1>
      <div className={classes.sidebar}>
        <Button onClick={() => navigate("models_1-10")}>models 1:10</Button>
        <Button onClick={() => navigate("error404")}>models 1:16</Button>
        <Button onClick={() => navigate("error404")}>models 1:18</Button>
        <Button onClick={() => navigate("error404")}>models 1:24</Button>
        <Button onClick={() => navigate("error404")}>models 1:43</Button>
        <Button onClick={() => navigate("error404")}>models 1:60</Button>
        <Button onClick={() => navigate("error404")}>models 1:87</Button>
      </div>
    </div>
  );
});
