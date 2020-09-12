import React, { useState } from "react";
import "./FeedbackPage.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
  margin: {
    margin: theme.spacing(1),
    width: 150,
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
}));

const validate = (values) => {
  const errors = {};

  if (values.name === "") {
    errors.name = "Поле обязательно для заполнения";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Неверный формат эл. почты";
  }

  if (values.message === "") {
    errors.message = "Поле обязательно для заполнения";
  }

  return errors;
};

export function FeedbackPage(props) {
  const [values, setValues] = useState();
  
  let history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Обратная связь</span>
        </div>
      </div>
      <div className="feedback_block">
        <form
          className={classes.root}
          onSubmit={formik.handleSubmit}
          autoComplete="on"
        >
          <TextField
            className={formik.errors.name ? classes.error_text : null}
            id="standard-basic"
            label="Введите ФИО"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            helperText={formik.errors.name ? formik.errors.name : null}
          />
          <TextField
            className={formik.errors.email ? classes.error_text : null}
            id="standard-helperText"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Введите e-mail"
            helperText={formik.errors.email ? formik.errors.email : null}
          />
          <TextField
            className={formik.errors.message ? classes.error_text : null}
            id="standard-multiline-static"
            type="text"
            id="message"
            name="message"
            label="Обращение"
            onChange={formik.handleChange}
            value={formik.values.message}
            helperText={formik.errors.message ? formik.errors.message : null}
            multiline
            rows="4"
          />
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
}
