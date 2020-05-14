import React, { useEffect } from "react";
import "./RegistrationPage.css";
import HomeIcon from "@material-ui/icons/Home";
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
      firstName: '',
      email: '',
      password1: '',
      password2: ''
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      alert("По пизде бы тебе настучать");
      // Здесь запрос на сервак
    },
  })

  const [values, setValues] = React.useState({
    showPassword1: false,
    showPassword2: false
  });

  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log("Ajax request");
    $.post("http://localhost/ajax/check_auth.php", { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.error == "false") {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
      setLoading(false);
    });
  }, []);


  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({showPassword1: !values.showPassword1, showPassword2: !values.showPassword2 });
  };

  const handleMouseDownPassword = (event) => {
    // event.preventDefault();
  };
  // const headerTextStyle = {
  //   color: "red"
  // }
  let history = useHistory();
  const classes = useStyles();


  // const registerRequest = () => {
  //   // console.log("Entered");
  //   // var login_form = document.getElementById("standard-basic");
  //   // var password_form = document.getElementById("standard-adornment-password");
  //   // var login_val = login_form.value;
  //   // var password_val = password_form.value;
  //   // if (login_val != "") {
  //   //   console.log(login_val);
  //   // } else {
  //   //   login_val = "";
  //   // }
  //   // if (password_val != "") {
  //   //   console.log(password_val);
  //   // } else {
  //   //   password_val = "";
  //   // }
  //   // if ((password_val != "") && (login_val != "")) {
  //   //   $.post("http://localhost/ajax/login.php", { target: 'logination', login: login_val, password: password_val }, function (data) {
  //   //     setLoading(true);
  //   //     var response = $.parseJSON(data);
  //   //     if (response.error == "true") {
  //   //       console.log("error");
  //   //       setError(true);
  //   //     } else {
  //   //       console.log("OK");
  //   //       setRedirect(true);
  //   //     }
  //   //     setLoading(false);
  //   //   });
  //   // }
  // };

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
          <span className="menu_header_text">Заведение аккаунта</span>
        </div>
      </div>
      <div className="login_block">
        <form className={classes.root} onSubmit={formik.handleSubmit} autoComplete="on">
          <TextField id={formik.errors.firstName ? "standard-error-helper-text" : "standard-basic"} label="Логин" type="text" onChange={formik.handleChange} value={formik.values.firstName} name="firstName" id="firstName" helperText={formik.errors.firstName ? formik.errors.firstName : null} />
          <TextField id="standard-helperText" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} label="Введите e-mail" helperText={formik.errors.email ? formik.errors.email : null} />
          <FormControl className={clsx(classes.textField)}>
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
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText style={{display: formik.errors.password1 ? "block" : "none"}}>{formik.errors.password1}</FormHelperText>
          </FormControl>
          <FormControl className={clsx(classes.textField)}>
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
                    onMouseDown={handleMouseDownPassword}
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
