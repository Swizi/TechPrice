import React, { useState, useContext } from "react";
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
import SearchTab from "../../components/SearchTab/SearchTab"

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
import LocationCityIcon from "@material-ui/icons/LocationCity";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import HomeIcon from "@material-ui/icons/Home";

import UserContext from '../.././UserContext';
import SearchContext from '../.././SearchContext';
import Collapse from '@material-ui/core/Collapse';

import TransitionGroup from 'react-transition-group/TransitionGroup';

import Cookies from 'universal-cookie';
// import { Router } from "react-router-dom"
// import {createBrowserHistory} from 'history'

// const history = createBrowserHistory()

// import { useHistory } from 'react-router-dom';

// function routeChange() {
//     let path = `../LoginPage/LoginPage.jsx`;
//     let history = useHistory();
//     history.push(path);
//   }


const useStyles = makeStyles({
  list: {
    width: 200
  }
});

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


export function MainPage(props) {

  const cookies = new Cookies();

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          "Домашняя страница",
          "Войти [Профиль]",
          "Акции",
          "Служба поддержки"
        ].map((text, index) => (
          <Link
            key={index}
            to={`${(index === 0 && "/") ||
              (index === 1 && "/LoginPage") ||
              (index === 2 && "/SalesPage") ||
              (index === 3 && "/HelpPage")}`}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <AccountBoxIcon />}
                {index === 2 && <MonetizationOnIcon />}
                {index === 3 && <ContactSupportIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="list_text" />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Выйти", `Город: ${userCity}`].map((text, index) => (
          <Link key={index} to={`${index === 1 && "/UserCityPage"}`}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <ExitToAppIcon />}
                {index === 1 && <LocationCityIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="list_text" />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );


  const { isClicked, editSearchTab } = useContext(SearchContext);
  console.log(props);

  const { userCity, setCity } = useContext(UserContext);

  return (
    <div className="page_flexbox">
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
      {/* <Collapse in={!isClicked} timeout={1}> */}
      <SearchTab />
      {/* </Collapse> */}
      <div className="navigation_menu">
        <div id="main-menu" className="menu_wrapper">
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <span
            id="pageHeader"
            className="page_header"
          >
            TechPrice
          </span>
          <SearchIcon onClick={() => editSearchTab(!isClicked)} className="search_icon" />
        </div>
      </div>
      <div className="products">
        <div className="items_header_block">
          <p className="items_header">Каталог товаров</p>
          <div className="city_block">
            <LocationOnIcon className="location_on_icon" />
            <Link to="/UserCityPage">
              <span className="city_text">{userCity}</span>
            </Link>
          </div>
        </div>
        <div className="product_cards">
          {props.catalog.map(function (item, index) {
            return <ItemsCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
