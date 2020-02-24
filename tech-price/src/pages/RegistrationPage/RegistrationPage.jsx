import React from "react";
import "./RegistrationPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  margin: {
    margin: theme.spacing(1),
    width: 200
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export function RegistrationPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }
  const classes = useStyles();

  return (
    <div className="page-flexbox">
      <div className="menu-navigation">
        <a href="/LoginPage">
          <ArrowBackIcon />
        </a>
        <a href="/">
          <HomeIcon />
        </a>
      </div>
      <div className="login-block">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Логин" />
          <TextField id="standard-basic" label="Пароль" />
          <TextField id="standard-basic" label="Пароль ещё раз" />
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}
