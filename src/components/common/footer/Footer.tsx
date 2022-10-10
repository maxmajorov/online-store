import React from "react";
import Logo from "../../../assets/img/logo.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import classes from "./Footer.module.scss";

type TFooter = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const Footer: React.FC<TFooter> = ({ open, setOpen }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <footer className={classes.footerSection}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.logo}>
            <img src={Logo} alt="logo" />
          </div>
          <ThemeProvider theme={theme}>
            <div className={classes.social}>
              <ul>
                <li>
                  <a href="" className={classes.links}>
                    <TelegramIcon
                      fontSize={"large"}
                      color={"primary"}
                      onClick={() => setOpen(!open)}
                    />
                  </a>
                </li>
                <li>
                  <a href="" className={classes.links}>
                    <FacebookIcon fontSize={"large"} color={"primary"} />
                  </a>
                </li>
                <li>
                  <a href="" className={classes.links}>
                    <TwitterIcon fontSize={"large"} color={"primary"} />
                  </a>
                </li>

                <li>
                  <a href="" className={classes.links}>
                    <EmailIcon fontSize={"large"} color={"primary"} />
                  </a>
                </li>
              </ul>
            </div>
          </ThemeProvider>
        </div>
      </div>
      <div className={classes.copyright}>
        Do you have any questions? Call me +7(999) 999-99-99
      </div>
    </footer>
  );
};
