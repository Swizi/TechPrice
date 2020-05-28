import React, { useState, useEffect } from "react";
import "./RegistrationPage.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%"
    },
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

  if (!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.firstName)){
    errors.firstName = "Имя больше 2 символов";
  }

  if (!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.lastName)){
    errors.lastName = "Фамилия больше 2 символов";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный формат эл. почты';
  }

  if (values.password1.length <= 3){
    errors.password1 = "Пароль больше 3 символов";
  } 

  if (values.password1 != values.password2){
    errors.password2 = "Пароли не совпадают";
  }

  return errors;
};

export function RegistrationPage(props) {
  const cookies = new Cookies();

  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      firstName: "",
      lastName: "",
      additionalName: "",
      password1: '',
      password2: ''
    },
    validate,
    onSubmit: values => {
      setLoadingAlert(true);
      $.post(`${props.host}/ajax/register.php`, { target: "registration", login: values.login, fname: values.firstName, lname: values.lastName, email: values.email, password: values.password1, aname: values.additionalName}, function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setRedirect(true);
        } else if (response.status == 3){
          setError(true);
          setRedirect(false);
          setErrorText('Логин уже занят!');
        } else {
          setError(true);
          setRedirect(false);
          setErrorText('');
        } 
        setLoadingAlert(false);
      });
    },
  })

  const [values, setValues] = useState({
    showPassword1: false,
    showPassword2: false
  });

  const [loadingAlert, setLoadingAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorPopUp, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    console.log("Ajax request");
    $.post(`${props.host}/ajax/check_auth.php`, { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status == 0) {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
      setLoading(false);
    });
  }, []);

  const handleClickShowPassword = () => {
    setValues({showPassword1: !values.showPassword1, showPassword2: !values.showPassword2 });
  };

  let history = useHistory();
  const classes = useStyles();

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
          <span className="menu_header_text">Заведение аккаунта</span>
        </div>
      </div>
      <Alert severity="error" className="alert" style={{ display: errorPopUp ? "flex" : "none" }}>Ошибка при вводе данных в форму<br/>{errorText}</Alert>
      <Alert severity="info" className="alert" style={{ display: loadingAlert ? "flex" : "none" }}>Загрузка...  <CircularProgress className="info_circular_progress" /></Alert>
      <div className="login_block">
        <form className={classes.root} onSubmit={formik.handleSubmit} autoComplete="on">
          <TextField required className={formik.errors.login? classes.error_text : null} id="standard-helperText" label="Логин" type="text" onChange={formik.handleChange} value={formik.values.login} name="login" id="login" helperText={formik.errors.login ? formik.errors.login : null}  />
          <TextField required className={formik.errors.email ? classes.error_text : null} id="standard-helperText" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} label="Введите e-mail" helperText={formik.errors.email ? formik.errors.email : null} />
          <TextField required className={formik.errors.firstName ? classes.error_text : null} id="standard-helperText" id="firstName" name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName} label="Введите имя" helperText={formik.errors.firstName ? formik.errors.firstName : null}/>
          <TextField required className={formik.errors.lastName ? classes.error_text : null} id="standard-helperText" id="lastName" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} label="Введите фамилию" helperText={formik.errors.lastName ? formik.errors.lastName : null}/>
          <TextField id="standard-helperText" id="additionalName" name="additionalName" type="text" onChange={formik.handleChange} value={formik.values.additionalName} label="Введите отчество" />
          <FormControl required className={clsx(classes.textField)} className={formik.errors.password1 ? classes.error_text : null}>
            <InputLabel htmlFor="password1">Пароль</InputLabel>
            <Input
              id="password1 standard-adornment-password"
              name="password1"
              type={values.showPassword1 ? 'text' : 'password'}
              value={formik.values.password1}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText style={{display: formik.errors.password1 ? "block" : "none"}}>{formik.errors.password1}</FormHelperText>
          </FormControl>
          <FormControl required className={clsx(classes.textField)} className={formik.errors.password2 || formik.errors.password1 ? classes.error_text : null}>
            <InputLabel htmlFor="password2">Пароль ещё раз</InputLabel>
            <Input
              id="password2 standard-adornment-password"
              name="password2"
              type={values.showPassword2 ? 'text' : 'password'}
              value={formik.values.password2}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText style={{display: formik.errors.password2 ? "block" : "none"}}>{formik.errors.password2}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Завести аккаунт
          </Button>
        </form>
      </div>
    </div>
  );
}
