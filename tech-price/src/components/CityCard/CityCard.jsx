import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./CityCard.css";

import UserContext from '../.././UserContext';

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

export default function CityCard(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }
  const {userCity, setCity} = useContext(UserContext);

  let history = useHistory();
  const classes = useStyles();
  var textStyle = {};
  if (userCity == props.data.city){
    textStyle = {
      color: "#FFD600"
    }
  }

  const changeLocation = () => {
    setCity(props.data.city);
  }

  return (
    <div className="city_card_block" onClick={changeLocation}>
      <h2 style={textStyle} className="default_gray_text">{props.data.city}</h2>
      <hr className="hr"/>
    </div>
  );
}

