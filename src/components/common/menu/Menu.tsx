import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../../const";
import classes from "./Menu.module.scss";

export const Menu: React.FC = () => {
  return (
    <nav className={classes.menuList}>
      {Object.values(menuItems).map((el, ind) => {
        const [link, route] = el.split("/");
        return (
          <NavLink
            to={route}
            state={link}
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            {link}
          </NavLink>
        );
      })}
    </nav>
  );
};
