import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import "./ProfilePage.css";

import { useFormik } from "formik";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import $ from "jquery";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
  margin: {
    margin: "0 0 20px 0",
    width: 200,
    marginTop: 30,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  error_text: {
    "& label, p": {
      color: "red",
    },
  },
  code_textfield: {
    "&": {
      margin: "0 0 20px 0",
      width: 180,
    },
  },
  edit_icon_margin:{
    "&": {
      margin: "0 0 0 5px"
    }
  }
}));

var editValues = {
  email: false,
  lName: false,
  fName: false,
  aName: false
}


const validate = (values) => {
  const errors = {};

  if ((!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.firstName)) && (editValues.fName)){
    errors.firstName = "Имя больше 2 символов";
  }

  if ((!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.lastName)) && (editValues.lName)){
    errors.lastName = "Фамилия больше 2 символов";
  }

  if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) && (editValues.email)){
    errors.email = "Неверный формат эл. почты";
  }

  return errors;
};

export function ProfilePage(props) {
  const classes = useStyles();

  const [editState, setEditState] = useState({
    email: false,
    fname: false,
    lname: false,
    aname: false,
    mailing: false,
  });

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleButton, setButton] = useState(false);
  const [user, setUser] = useState({
    aname: "",
    email: "",
    fname: "",
    lname: "",
    login: "",
    mailing: false,
    code: 0
  });

  useEffect(() => {
    $.post(`${props.host}/ajax/user.php`, { target: "user-info" }, function (
      data
    ) {
      var response = $.parseJSON(data);
      if (response.status === 0) {
        setRedirect(false);
        setUser({
          aname: response.aname,
          email: response.email,
          fname: response.fname,
          lname: response.lname,
          login: response.login,
          mailing: response.mailing,
          code: response.code
        });
        // if (response.mailing === "f") {
        //   setState({ checkedA: false });
        // } else {
        //   setState({ checkedA: true });
        // }
      } else {
        setRedirect(true);
      }
      setLoading(false);
    });
  }, [props.host]);

  const formik = useFormik({
    initialValues: {
      login: user.login,
      email: user.email,
      firstName: user.fname,
      lastName: user.lname,
      additionalName: user.aname,
    },
    validate,
    onSubmit: values =>{
      alert(values.email);
      // Запрос на сервер на изменение чего-либо(ифом проверить что именно(из editState))
      setEditState({
        email: false,
        fname: false,
        lname: false,
        aname: false,
        mailing: false,
      });

    }
  });

  const [state, setState] = useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.checked });
    setEditState({ ...editState, [event.target.name]: event.target.checked });
  };

  let history = useHistory();

  // if (redirect) {
  //   return <Redirect to="/" />
  // }

  if (
    (editState.email ||
      editState.login ||
      editState.lastName ||
      editState.firstName ||
      editState.additionalName ||
      editState.mailing) &&
    !toggleButton
  ) {
    setButton(true);
  }

  if (
    !editState.email &&
    !editState.login &&
    !editState.lastName &&
    !editState.firstName &&
    !editState.additionalName &&
    !editState.mailing &&
    toggleButton
  ) {
    setButton(false);
  }

  function changeEmailButtonState(){
    setEditState({ ...editState, ["email"]: !editState.email });
    editValues.email = !editValues.email;
  }

  function changeLastNameButtonState(){
    setEditState({ ...editState, ["lastName"]: !editState.lastName });
    editValues.lName = !editValues.lName;
  }

  function changeFirstNameButtonState(){
    setEditState({ ...editState, ["firstName"]: !editState.firstName });
    editValues.fName = !editValues.fName;
  }

  function changeAdditionalNameButtonState(){
    setEditState({
      ...editState,
      ["additionalName"]: !editState.additionalName,
    });    
    editValues.aName = !editValues.aName;
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
          <span className="menu_header_text">Личные данные</span>
        </div>
      </div>
      <div className="profile_block">
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="on"
        >
          <p className="default_gray_text">Код подтверждения</p>
          <div className="form_field_block">
            <span className="default_black_text">4138{user.code}</span>
          </div>
          <p className="default_gray_text">Логин</p>
          <div className="form_field_block">
            <span className="default_black_text">swizi{user.login}</span>
          </div>
          <p className="default_gray_text">Электроная почта</p>
          <div className="form_field_block">
            {editState.email ? (
              <TextField
                style={{ width: "90%" }}
                variant="outlined"
                className={formik.errors.email ? classes.error_text : null}
                id="standard-helperText"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                label=""
                helperText={formik.errors.email ? formik.errors.email : null}
              />
            ) : (
              <span className="default_black_text">denis.bosiy@gmail.com{user.email}</span>
            )}
            <IconButton
              className={classes.edit_icon_margin}
              onClick={changeEmailButtonState}
              name="email"
            >
              <CreateIcon name="email" />
            </IconButton>
          </div>
          <p className="default_gray_text">Фамилия</p>
          <div className="form_field_block">
            {editState.lastName ? (
              <TextField
                style={{ width: "90%" }}
                className={formik.errors.lastName ? classes.error_text : null}
                id="standard-helperText"
                id="lastName"
                name="lastName"
                type="lastName"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                label=""
                helperText={
                  formik.errors.lastName ? formik.errors.lastName : null
                }
              />
            ) : (
              <span className="default_black_text">Босый{user.lname}</span>
            )}
            <IconButton
              onClick={changeLastNameButtonState}
              name="lastName"
              className={classes.edit_icon_margin}
            >
              <CreateIcon name="lastName" />
            </IconButton>
          </div>
          <p className="default_gray_text">Имя</p>
          <div className="form_field_block">
            {editState.firstName ? (
              <TextField
                style={{ width: "90%" }}
                className={formik.errors.firstName ? classes.error_text : null}
                id="standard-helperText"
                id="firstName"
                name="firstName"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                label=""
                helperText={
                  formik.errors.firstName ? formik.errors.firstName : null
                }
              />
            ) : (
              <span className="default_black_text">Денис{user.fname}</span>
            )}
            <IconButton
              onClick={changeFirstNameButtonState}
              name="firstName"
              className={classes.edit_icon_margin}
            >
              <CreateIcon name="firstName" />
            </IconButton>
          </div>
          <p className="default_gray_text">Отчество</p>
          <div className="form_field_block">
            {editState.additionalName ? (
              <TextField
                style={{ width: "90%" }}
                className={
                  formik.errors.additionalName ? classes.error_text : null
                }
                id="standard-helperText"
                id="additionalName"
                name="additionalName"
                variant="outlined"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.additionalName}
                label=""
              />
            ) : (
              <span className="default_black_text">Владиславович{user.aname}</span>
            )}
            <IconButton
              onClick={changeAdditionalNameButtonState}
              name="additionalName"
              className={classes.edit_icon_margin}
            >
              <CreateIcon name="additionalName" />
            </IconButton>
          </div>
          <FormControlLabel
            className="checkbox_label"
            control={
              <Checkbox
                checked={user.mailing}
                onChange={handleChange}
                name="mailing"
              />
            }
            label="Отправлять выгодные предложения из желаемых"
          />
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
            disabled={toggleButton ? false : true}
          >
            Подтвердить
          </Button>
        </form>
      </div>
    </div>
  );
}
