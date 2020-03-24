import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./UserCityPage.css";
import CityCard from "../../components/CityCard/CityCard"

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
  let history = useHistory();
  const classes = useStyles();

  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Выбор станицы</span>
        </div>
      </div>
      <div className="cities_block">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className="text_field"
            id="standard-search"
            label="Місто"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
        <div className="city_cards_block">
          {props.cities.map(function(item, index) {
            return <CityCard key={index} data={item} userCity={props.userCity} />;
          })}
        </div>
      </div>
    </div>
  );
}
