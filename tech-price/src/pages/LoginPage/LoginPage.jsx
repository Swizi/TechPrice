import React, { useEffect } from "react";
import "./LoginPage.css";
import clsx from 'clsx';
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Redirect, Link } from "react-router-dom";

import Cookies from 'universal-cookie';

import $ from 'jquery';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%"
    }
  },
  margin: {
    margin: theme.spacing(1),
    width: 200,
    marginTop: 30
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));


export function LoginPage(props) {
  let history = useHistory();

  const cookies = new Cookies();
  // const headerTextStyle = {
  //   color: "red"
  // }
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [errorPopUp, setError] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    $.post("http://localhost/ajax/check_auth.php", { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.error == "false") {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
      setLoading(false);
    })
  }, []);

  const loginRequest = () => {
    console.log("Entered");
    var login_form = document.getElementById("standard-basic");
    var password_form = document.getElementById("standard-adornment-password");
    var login_val = login_form.value;
    var password_val = password_form.value;
    if (login_val != "") {
      console.log(login_val);
    } else {
      login_val = "";
    }
    if (password_val != "") {
      console.log(password_val);
    } else {
      password_val = "";
    }
    if ((password_val != "") && (login_val != "")) {
      $.post("http://localhost/ajax/login.php", { target: 'logination', login: login_val, password: password_val }, function (data) {
        setLoading(true);
        var response = $.parseJSON(data);
        if (response.error == "true") {
          console.log("error");
          setError(true);
        } else {
          console.log("OK");
          setRedirect(true);
        }
        setLoading(false);
      });
    }
  };

  // console.log(redirect);

  if (loading) {
    return (
      <div className="loading_screen">
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  if (redirect) {
    return <Redirect to="/" />
  }

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
      <Alert severity="error" className="error_alert" style={{ display: errorPopUp ? "flex" : "none" }}>Ошибка при вводе данных в форму</Alert>
      <div className="login_block">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Логин" />
          {/* <TextField id="standard-password-input" label="Пароль" type="password"  autoComplete="current-password"/> */}
          <FormControl className={clsx(classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
            onClick={loginRequest}
          >
            Зайти
          </Button>
        </form>
        <Link to="/RegistrationPage" className="bottom_text">
          Ещё не записался?
          </Link>
        <Link to="/ProfilePage" className="bottom_text">
          Профиль
          </Link>
      </div>
    </div>
  );
}