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
import "./UserCityPage.css";
import CityCard from "../../components/CityCard/CityCard";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import UserContext from '../.././UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
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
  const { userCity, setCity } = useContext(UserContext);
  const [search_value, changeSearchValue] = React.useState("");
  const [cities, changeCitiesValue] = React.useState(props.cities);

  var value = "";
  
  const makeSearchingRequest = () => {
    value = document.getElementById("standard-search").value;
    value = value.toLowerCase();
    console.log(value);
    var sorted_cities = [];
    for (var i = 0; i < cities.length; i++) {
      if (cities[i].city.toLowerCase().substring(0, value.length) == value) {
        sorted_cities.push(cities[i]);
      }
    }
    if (value === "") {
      sorted_cities = props.cities;
    }
    changeSearchValue(value);
    changeCitiesValue(sorted_cities);
  }

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
        <form autoComplete="on" className="city_form">
          <TextField
            className="text_field"
            id="standard-search"
            onChange={makeSearchingRequest}
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
          {cities.map(function (item, index) {
            return <CityCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

