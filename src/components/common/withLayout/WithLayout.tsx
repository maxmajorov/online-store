import React from "react";
import classes from "./WithLayout.module.scss";

type WithLayoutPropsType = {
  children: React.ReactNode;
};

export const WithLayout: React.FC<WithLayoutPropsType> = ({ children }) => {
  return (
    <div className={classes.page}>
      {/* <div>
                    <Header />
                </div> */}
      <div className={classes.container}>
        <div className={classes.body}>
          {/* {isMenuShown && <SideBar />} */}
          <div className={classes.main}>{children}</div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
