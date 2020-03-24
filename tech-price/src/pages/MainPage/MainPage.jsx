import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../../components/LoginButton/LoginButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import "./MainPage.css";
import ItemsCard from "../../components/ItemsCard/ItemsCard";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LocationCityIcon from "@material-ui/icons/LocationCity";

// import { Router } from "react-router-dom"
// import {createBrowserHistory} from 'history'

// const history = createBrowserHistory()

// import { useHistory } from 'react-router-dom';

// function routeChange() {
//     let path = `../LoginPage/LoginPage.jsx`;
//     let history = useHistory();
//     history.push(path);
//   }

const options = [
  "Москва",
  "Санкт-Петербург",
  "Краснодар",
  "Калининград",
  "Севастополь",
  "Симферополь",
  "Казань",
  "Чебоксары",
  "Нижний Новгород",
  "Крымск",
  "Анапа",
  "Новороссийск",
  "Долинск",
  "Йошкар-Ола"
];

const ITEM_HEIGHT = 48;

export function MainPage(props) {
  const [isFocused, changeStyle] = useState(true);
  console.log(props);

  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div id="main-menu" className="menu_wrapper">
          <IconButton
            onClick={props.toggleDrawer("left", true)}
            edge="start"
            className={props.classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <span
            id="pageHeader"
            className="page_header"
            style={{ fontSize: isFocused ? "24px" : "0px" }}
          >
            TechPrice
          </span>
          <form
            className={props.classes.root}
            noValidate
            autoComplete="off"
            className="search_form"
          >
            <TextField
              style={{ width: isFocused ? "70px" : "200px" }}
              onClick={() => changeStyle(!isFocused)}
              onMouseOut={() => changeStyle(!isFocused)}
              className="textField"
              id="standard-basic"
            />
            <SearchIcon className="search_icon" />
          </form>
        </div>
      </div>
      <div className="products">
        <div className="items_header_block">
          <p className="items_header">Каталог товаров</p>
          <div className="city_block">
            <LocationOnIcon className="location_on_icon" />
            <Link to="/UserCityPage">
              <span className="city_text">{props.userCity}</span>
            </Link>
          </div>
        </div>
        <div className="product_cards">
          {props.catalog.map(function(item, index) {
            return <ItemsCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
