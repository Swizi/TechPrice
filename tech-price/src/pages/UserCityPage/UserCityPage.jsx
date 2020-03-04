import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  margin: {
    margin: theme.spacing(1),
    width: 200
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export function UserCityPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }
  const classes = useStyles();

  return (
    <div className="page-flexbox">
      <div className="menu-navigation">
        <a href="/">
          <ArrowBackIcon />
        </a>
      </div>
      <div className="login-block">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className="text-field"
            label="Искать город"
            variant="outlined"
            InputProps={{
              // className: 'text-field',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>
    </div>
  );
}
