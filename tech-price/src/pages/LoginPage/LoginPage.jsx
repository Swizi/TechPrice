import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import clsx from 'clsx';
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
  },
  error_text: {
    '& label, p': {
      color: 'red',
    },
  }
}));

const validate = values => {
  const errors = {};
  if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)){
    errors.login = 'Логин меньше 16 и больше 4 символов';
  }

  if (values.password.length <= 3){
    errors.password = "Пароль больше 3 символов";
  } 

  return errors;
};


export function LoginPage(props) {
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadingAlert, setLoadingAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      setLoadingAlert(true);
      $.post(`${props.host}/ajax/login.php`, { target: 'logination', login: values.login, password: values.password }, function (data) {
        var response = $.parseJSON(data);
        if (response.status != 0) {
          setError(true);
        } else {
          setRedirect(true);
        }
        setLoadingAlert(false);
      });
    },
  })

  const cookies = new Cookies();

  const classes = useStyles();
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [errorPopUp, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClickShowPassword = () => {
    setValues({showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    $.post(`${props.host}/ajax/check_auth.php`, { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status == 0) {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
      setLoading(false);
    })
  }, []);

  if (redirect) {
    return <Redirect to="/" />
  }

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
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
      <Alert severity="error" className="alert" style={{ display: (errorPopUp && !loadingAlert) ? "flex" : "none" }}>Ошибка при вводе данных в форму</Alert>
      <Alert severity="info" className="alert" style={{ display: loadingAlert ? "flex" : "none" }}>Загрузка...  <CircularProgress className="info_circular_progress" /></Alert>
      <div className="login_block">
        <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField className={formik.errors.login ? classes.error_text : null} id={formik.errors.login ? "standard-helperText" : "standard-basic"} label="Логин" onChange={formik.handleChange} value={formik.values.login} name="login" id="login" helperText={formik.errors.login ? formik.errors.login : null}/>
          <FormControl className={clsx(classes.textField)} className={formik.errors.password ? classes.error_text : null}>
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