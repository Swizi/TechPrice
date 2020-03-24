import React from "react";
import "./FeedbackPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

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

export function FeedbackPage(props) {
  let history = useHistory();
  const classes = useStyles();

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
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Введите ФИО" />
          <TextField id="standard-basic" label="Номер телефона" />
          <TextField id="standard-basic" label="Введите e-mail" />
          <TextField
            id="standard-multiline-static"
            label="Обращение"
            multiline
            rows="4"
          />
          <Button
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
