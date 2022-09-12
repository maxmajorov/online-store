import React from "react";
import classes from "./WithLayout.module.scss";

type WithLayoutPropsType = {
  children: React.ReactNode;
};

export const WithLayout: React.FC<WithLayoutPropsType> = ({ children }) => {
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        {/* {isMenuShown && <SideBar />} */}
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
