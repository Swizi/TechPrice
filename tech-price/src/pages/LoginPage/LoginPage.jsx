import React from "react";
import "./LoginPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%"
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
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            Вход
          </span>
        </div>
      </div>
      <Alert severity="success">Ок, ща всё буит!</Alert>
      <div className="login_block">
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
        <a href="/RegistrationPage" className="bottom_text">
          Ещё не записался?
        </a>
      </div>
    </div>
  );
}
