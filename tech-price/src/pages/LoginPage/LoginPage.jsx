import React from "react";
import "./LoginPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  margin: {
    margin: theme.spacing(1),
    width: 150,
    marginTop: 30
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export function LoginPage(props) {
  let history = useHistory();
  // const headerTextStyle = {
  //   color: "red"
  // }
  const classes = useStyles();

  return (
    <div className="page-flexbox">
      <div className="navigation-menu">
        <div className="default-menu-wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu-header-text">
            Вход
          </span>
        </div>
      </div>
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
          Ещё не записался?
        </a>
      </div>
    </div>
  );
}
