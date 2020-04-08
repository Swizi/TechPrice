import React from "react";
import "./FeedbackPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
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
    width: 150,
    marginTop: 30
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const validate = values => {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный формат эл. почты';
  }

  return errors;
};

export function FeedbackPage(props) {
  const [values, setValues] = React.useState();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
        <form className={classes.root} onSubmit={formik.handleSubmit} autoComplete="on">
          <TextField id="standard-basic" label="Введите ФИО" />
          <TextField id="standard-helperText" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} label="Введите e-mail" helperText={formik.errors.email ? formik.errors.email : null} />
          <TextField
            id="standard-multiline-static"
            label="Обращение"
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
