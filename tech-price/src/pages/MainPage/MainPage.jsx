import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "./MainPage.css";
import ItemsCard from "../../components/ItemsCard/ItemsCard";
import IconButton from "@material-ui/core/IconButton";
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
import StarsIcon from '@material-ui/icons/Stars';

import UserContext from '../.././UserContext';
import SearchContext from '../.././SearchContext';
import SubcategoriesContext from '../.././SubcategoriesContext';

import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useHistory } from 'react-router-dom';

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


  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuAction, setAction] = useState(false);
  const [category, setCategory] = useState({});

  const [toSubCategory, editClicked] = useState(false);


  const classes = useStyles();
  const [state, setState] = useState({
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
    $.post(`${props.host}/ajax/check_auth.php`, { target: "checking" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status === 0) {
        setAuth(true);
      } else {
        setAuth(false);
      }
      setLoading(false);
    });
  }, [props.host]);

  useEffect(() => {
    if (menuAction) {
      $.post(`${props.host}/ajax/logout.php`, { target: "logout" }, function (data) {
        var response = $.parseJSON(data);
        if (response.status === 0) {
          setAuth(false);
        } else {
          setAuth(true);
        }
        setAction(false);
      });
    }
  }, [menuAction]);


  if (auth) {
    second_menu_list.push("Выйти");
    first_menu_list.push("Профиль");
  } else {
    first_menu_list.push("Войти");
  }

  first_menu_list.push("Избранное");
  // Передвинуть Избранное в auth, когда перекину на локалхост обычный
  first_menu_list.push("Акции");
  first_menu_list.push("Служба поддержки");


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
              (index === 2 && "/FavoritesPage") ||
              (index === 3 && "/SalesPage") ||
              (index === 4 && "/HelpPage")}`}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <AccountBoxIcon />}
                {index === 2 && <StarsIcon />}
                {index === 3 && <MonetizationOnIcon />}
                {index === 4 && <ContactSupportIcon />}
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
            onClick={index ? () => setAction(!menuAction) : null}>
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
      if ((response.status === 0) || (response.status === 8)) {
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
      } else {
        // Ошибочка вышла
      }
      setLoading(false);
    });   
    editClicked(false);
  }


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
      <SearchTab host={props.host}/>
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
