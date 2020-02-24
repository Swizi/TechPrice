import React from "react";
import "./LoginPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  margin: {
    margin: theme.spacing(1),
    width: 150
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export function LoginPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }
  const classes = useStyles();

  return (
    <div className="page-flexbox">
      <a href="/">
        <HomeIcon />
      </a>
      <div className="login-block">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Логин" />
          <TextField id="standard-basic" label="Пароль" />
          <TextField id="standard-basic" label="Номер карты сбербанка" />
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Зайти
          </Button>
        </form>
        <a href="/RegistrationPage" className="bottom-text">
          Ещё не зарегистрированы???
        </a>
      </div>
    </div>
  );
}
