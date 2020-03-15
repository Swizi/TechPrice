import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
//C:\Users\denis\Desktop\TechPrice\tech-price\src\pages\SalesPage\SalesPage.jsx
//C:\Users\denis\Desktop\TechPrice\tech-price\src\components\SaleProductCard\SaleProductCard.jsx
import HelpCard from "../../components/HelpCard/HelpCard";
import "./HelpPage.css";

export function HelpPage(props) {
  console.log(props);
  var href = window.location.href;
  let history = useHistory();
  return (
    <div className="page-flexbox">
      <div className="navigation-menu">
        <div className="default-menu-wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu-header-text">Помощь</span>
        </div>
      </div>
      <div className="products">
        <div className="help-cards">
          {props.help_data.map(function(item, index) {
            return <HelpCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
