import React from "react";
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";
import $ from 'jquery';

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

  return errors;
};

export function RegistrationPage(props) {
  const cookies = new Cookies();

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [redirect, setRedirect] = React.useState(false);

  $.post("", {target: "checking"}, function(data){
    var response = $.parseJSON(data);
    if (response.error == "false"){
      setRedirect(true);
    }
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const headerTextStyle = {
  //   color: "red"
  // }
  let history = useHistory();
  const classes = useStyles();

  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })

  // const changeEmailStyle = () => {
  //   var email_html = document.getElementById("email_input");
  //   var email_value = document.getElementById("email_input").value;
  //   console.log(email_value.indexOf("@"));
  //   if(email_value.indexOf("@") === -1){
  //     console.log(isError ? "standard-error-helper-text" : "standard-basic");
  //     isError = true;
  //     console.log(isError ? "standard-error-helper-text" : "standard-basic");
  //     emailHelperText = "Неправильно введена эл. почта";
  //     email_html.helperText = emailHelperText;
  //     console.log(email_html.helperText)
  //   } else {
  //     isError = false;
  //     emailHelperText = "";
  //   }

  // }
  if (redirect){
    return (
      <Redirect to="" />
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
          <TextField id={formik.errors.firstName ? "standard-error-helper-text" : "standard-basic"} label="Логин" type="text" onChange={formik.handleChange} value={formik.values.firstName} name="firstName" id="firstName" helperText={formik.errors.firstName ? formik.errors.firstName : null}/>
          <TextField id="standard-helperText" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} label="Введите e-mail" helperText={formik.errors.email ? formik.errors.email : null} />
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
          <FormControl className={clsx(classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Пароль ещё раз</InputLabel>
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
