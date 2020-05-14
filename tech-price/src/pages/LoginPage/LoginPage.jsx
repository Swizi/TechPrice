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
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Redirect, Link } from "react-router-dom";

import Cookies from 'universal-cookie';

import $ from 'jquery';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useFormik } from 'formik';

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

const validate = values => {
  const errors = {};
  if ((values.firstName.length > 15) || (values.firstName.length < 5)) {
    errors.firstName = 'Логин меньше 16 и больше 5 символов';
  }

  if (values.password.length <= 3){
    errors.password = "Пароль больше 3 символов";
  } 

  return errors;
};


export function LoginPage(props) {
  let history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [loadingAlert, setLoadingAlert] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      alert("По пизде бы тебе настучать");
      setLoadingAlert(true);
      $.post("http://localhost/ajax/login.php", { target: 'logination', login: values.firstName, password: values.password }, function (data) {
        var response = $.parseJSON(data);
        if (response.error == "true") {
          console.log("error");
          setError(true);
        } else {
          console.log("OK");
          setRedirect(true);
        }
        setLoadingAlert(false);
      });
      // Здесь запрос на сервак
    },
  })

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

  const handleClickShowPassword = () => {
    setValues({showPassword: !values.showPassword });
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

  // const loginRequest = () => {
  //   console.log("Entered");
  //   var login_form = document.getElementById("standard-basic");
  //   var password_form = document.getElementById("standard-adornment-password");
  //   var login_val = login_form.value;
  //   var password_val = password_form.value;
  //   if (login_val != "") {
  //     console.log(login_val);
  //   } else {
  //     login_val = "";
  //   }
  //   if (password_val != "") {
  //     console.log(password_val);
  //   } else {
  //     password_val = "";
  //   }
  //   if ((password_val != "") && (login_val != "")) {
  //     $.post("http://localhost/ajax/login.php", { target: 'logination', login: login_val, password: password_val }, function (data) {
  //       setLoading(true);
  //       var response = $.parseJSON(data);
  //       if (response.error == "true") {
  //         console.log("error");
  //         setError(true);
  //       } else {
  //         console.log("OK");
  //         setRedirect(true);
  //       }
  //       setLoading(false);
  //     });
  //   }
  // };

  // console.log(redirect);


  if (redirect) {
    return <Redirect to="/" />
  }

  if (loading) {
    return (
      <CircularProgress className="circular_progress" />
    );
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
      <Alert severity="error" className="alert" style={{ display: errorPopUp ? "flex" : "none" }}>Ошибка при вводе данных в форму</Alert>
      <Alert severity="info" className="alert" style={{ display: loadingAlert ? "flex" : "none" }}>Загрузка...  <CircularProgress className="info_circular_progress" /></Alert>
      <div className="login_block">
        <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField id={formik.errors.firstName ? "standard-error-helper-text" : "standard-basic"} label="Логин" onChange={formik.handleChange} value={formik.values.firstName} name="firstName" id="firstName" helperText={formik.errors.firstName ? formik.errors.firstName : null}/>
          {/* <TextField id="standard-password-input" label="Пароль" type="password"  autoComplete="current-password"/> */}
          <FormControl className={clsx(classes.textField)}>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <Input
              id="password standard-adornment-password"
              name="password"
              type={values.showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
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
            <FormHelperText style={{display: formik.errors.password ? "block" : "none"}}>{formik.errors.password}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
            // onClick={loginRequest}
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