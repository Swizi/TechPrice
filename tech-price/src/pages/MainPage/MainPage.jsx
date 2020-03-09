import React, { useState } from "react";
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
  const [isVisible, changeVisible] = useState(true);
  console.log(props);

  // const headerTextStyle = {
  //   color: "red"
  // }

  // var city = "Йошкар-Ола";

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = event => {
  //   setAnchorEl(null);
  //   console.log(event.currentTarget.textContent);
  //   city = event.currentTarget.textContent;
  //   // Меняется список товаров на главной странице + весь поиск идёт только по этому городу
  // };
  // spareMenu.style.display = "none";

  return (
    <div className="page-flexbox">
      <div className="navigation-menu">
        <div id="main-menu" className="menu-wrapper">
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
            className="page-header"
            style={{ fontSize: isVisible ? "24px" : "0px" }}
          >
            TechPrice
          </span>
          <form
            className={props.classes.root}
            noValidate
            autoComplete="off"
            className="search-form"
          >
            <TextField
              onClick={() => changeVisible(!isVisible)}
              onMouseOut={() => changeVisible(!isVisible)}
              className="textField"
              id="standard-basic"
              label="Поиск"
            />
            <SearchIcon className="search-icon" />
          </form>
        </div>
      </div>
      {/* <TextField
        className="text-field"
        label="Искать товары"
        variant="outlined"
        InputProps={{
          // className: 'text-field',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      /> */}
      <div className="products">
        <div className="items-header-block">
          <p className="items-header">Каталог товаров</p>
          <div className="city-block">
            <LocationOnIcon className="location-on-icon" />
            <span className="city-text">Йошкар-Ола</span>
          </div>
        </div>
        <div className="product-cards">
          {props.catalog.map(function(item, index) {
            return <ItemsCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
