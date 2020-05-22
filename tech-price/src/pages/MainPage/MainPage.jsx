import React, { useState, useContext, useEffect } from "react";
import useStateWithCallback from "use-state-with-callback";
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
import SearchTab from "../../components/SearchTab/SearchTab";

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
import SubcategoriesContext from '../.././SubcategoriesContext';
import Collapse from '@material-ui/core/Collapse';

import TransitionGroup from 'react-transition-group/TransitionGroup';

import Cookies from 'universal-cookie';
import $ from 'jquery';
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Router } from "react-router-dom"
// import {createBrowserHistory} from 'history'

// const history = createBrowserHistory()

import { useHistory } from 'react-router-dom';

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
  let history = useHistory();

  const { isClicked, editSearchTab } = useContext(SearchContext);
  const { userCity, setCity } = useContext(UserContext);
  const { subcategories, editSubcategories } = useContext(SubcategoriesContext);

  const cookies = new Cookies();

  const [auth, setAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [menuAction, setAction] = React.useState(false);
  const [category, setCategory] = React.useState({});

  const [toSubCategory, editClicked] = React.useState(false);

  // const [loading, setLoading] = React.useState(true);

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

  var second_menu_list = [`Город: ${userCity}`];
  var first_menu_list = ["Домашняя страница"];

  useEffect(() => {
    console.log("Ajax request");
    $.post(`${props.host}/ajax/check_auth.php`, { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status == 0) {
        setAuth(true);
      } else {
        setAuth(false);
      }
      setLoading(false);
    });
  }, []);

  // useEffect(()=> {
  //   if (loading){
  //     return  <CircularProgress className="circular_progress" />
  //     setLoading(false);
  //   }
  // });

  const logoutRequest = async () => {
    setLoading(true);
    $.post(`${props.host}/ajax/logout.php`, { target: "logout" }, async function (data) {
      console.log("Loading 1 - ", loading);
      console.log(auth);
      var response = await $.parseJSON(data);
      if (response.status == 0) {
        setAuth(false);
      } else {
        setAuth(true);
      }
      console.log("Loading 2 - ", loading);
      console.log(auth);
    });
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      console.log("LOADING IS TRUE");
    } else {
      console.log("LOADING IS FALSE");
    }
    // if (loading) {
    //   return <CircularProgress className="circular_progress" />

    // }
  }, [loading]);

  useEffect(() => {
    if (menuAction) {
      console.log("MENU ACTION IS TRUE");
      $.post(`${props.host}/ajax/logout.php`, { target: "logout" }, function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setAuth(false);
        } else {
          setAuth(true);
        }
        setAction(false);
      });
    } else {
      console.log("MENU ACTION IS FALSE");
    }
  }, [menuAction]);

  console.log("Auth - ", auth);

  if (auth) {
    second_menu_list.push("Выйти");
    first_menu_list.push("Профиль");
  } else {
    first_menu_list.push("Войти");
  }

  first_menu_list.push("Акции");
  first_menu_list.push("Служба поддержки");

  console.log("Loading = ", loading);

  const sideList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <CircularProgress className="circular_progress" style={{ display: menuAction ? "block" : "none" }} />
      <List style={{ display: menuAction ? "none" : "block" }}>
        {first_menu_list.map((text, index) => (
          <Link
            key={index}
            to={`${(index === 0 && "/") ||
              (index === 1 && !auth && "/LoginPage") ||
              (index === 1 && auth && "/ProfilePage") ||
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
      <CircularProgress className="circular_progress" style={{ display: menuAction ? "block" : "none" }} />
      <List style={{ display: menuAction ? "none" : "block" }}>
        {second_menu_list.map((text, index) => (
          <Link key={index} to={`${(index === 0 && "/UserCityPage") ||
            (index === 1 && "/")}`}
            onClick={index ? () => setAction(!menuAction) : console.log("VSEM PRIVETIK")}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 1 && <ExitToAppIcon onClick={(e) => setAction(true)} />}
                {index === 0 && <LocationCityIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="list_text" />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  if (toSubCategory){
    setLoading(true);
    $.post(`${props.host}/ajax/get_content.php`, { target: 'get-subcateg', link: category.link }, function (data) {
      var response = $.parseJSON(data);
      console.log(response);
      if ((response.status == 0) || (response.status == 8)) {
        // Ответ пришёл 
        var subcategory_array = [];
        for (var i = 0; i < response.subcategories.length; i++){
          var subcategory = {
            name: response.subcategories[i],
            url: response.pics[i],
            link: response.links[i]
          }
          subcategory_array.push(subcategory);
        }
        editSubcategories({
          header: category.name,
          array: subcategory_array
        });
        history.push("/RedirectPage");
        // history.push("/ProductPage");
      } else {
        // Ошибочка вышла
      }
      setLoading(false);
    });   
    editClicked(false);
  }

  console.log(props);
  // setLoading(true);

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }
  
  return (
    < div className="page_flexbox" >
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        style={{ display: loading ? "none" : "block" }}
      >
        {sideList("left")}
      </SwipeableDrawer>
      {/* <Collapse in={!isClicked} timeout={1}> */}
      <SearchTab host={props.host}/>
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
            return <ItemsCard onClick={() => {setCategory(item);editClicked(true)}} key={index} data={item} />;
          })}
        </div>
      </div>
    </div >
  );
}
