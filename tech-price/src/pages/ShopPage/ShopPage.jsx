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
import SaleProductCard from "../../components/SaleProductCard/SaleProductCard";
import SortingBlock from "../../components/SortingBlock/SortingBlock";

import Collapse from "@material-ui/core/Collapse";
import HelpIcon from "@material-ui/icons/Help";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export function ShopPage(props) {
  const classes = useStyles();


  console.log(props);
  var href = window.location.href;
  href = href.split("/");
  var items_index = href[href.length - 1];
  var href_index = href[href.length - 2];
  let history = useHistory();
  var products = props.catalog[href_index].items[items_index].items;
  console.log(props.catalog[href_index].items[items_index]);

  const [open, setOpen] = React.useState(false);
  const [products_array, setProducts] = React.useState(products);

  const handleClick = () => {
    setOpen(!open);
  };

  const toDescendingPrice = () => {
    var prices = [];
    for (var i = 0; i < products.length; i++){
      prices.push(products[i].shops[0].price);
    }
    console.log(prices.sort((a, b) => a - b));

    // products sort by prices array

    var sorted_array = [];
    for(var i = 0; i < products.length; i++){
      for(var j = 0; j < products.length; j++){
        if ( prices[i] === products[j].shops[0].price){
          sorted_array.push(products[j]);
        }
      }
    }

    products = sorted_array;

    console.log(products);

    setProducts(products);

  };

  const toAscendingPrice = () => {
    var prices = [];
    for (var i = 0; i < products.length; i++){
      prices.push(products[i].shops[0].price);
    }
    console.log(prices.sort((a, b) => b - a));

    // products sort by prices array

    var sorted_array = [];
    for(var i = 0; i < products.length; i++){
      for(var j = 0; j < products.length; j++){
        if ( prices[i] === products[j].shops[0].price){
          sorted_array.push(products[j]);
        }
      }
    }

    products = sorted_array;

    console.log(products);

    setProducts(products);

  };

  const toPopularity = () => {
    var popularity_array = [];
    for (var i = 0; i < products.length; i++){
      popularity_array.push(products[i].popularity);
    }
    console.log(popularity_array.sort((a, b) => b - a));

    // products sort by prices array

    var sorted_array = [];
    for(var i = 0; i < products.length; i++){
      for(var j = 0; j < products.length; j++){
        if ( popularity_array[i] === products[j].popularity){
          sorted_array.push(products[j]);
        }
      }
    }

    products = sorted_array;

    console.log(products);

    setProducts(products);

  };


  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            {props.catalog[href_index].items[items_index].name}
          </span>
        </div>
      </div>
      <div className="products">
        {/* <SortingBlock products={products} sorting_text={props.sorting_text}/> */}
        <ListItem button onClick={handleClick}>
          <ListItemText primary={props.sorting_text[0]} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem onClick={toPopularity} button className={classes.nested}>
              <ListItemText primary={props.sorting_text[0]} />
            </ListItem>
            <ListItem onClick={toDescendingPrice} button className={classes.nested}>
              <ListItemText primary={props.sorting_text[1]} />
            </ListItem>
            <ListItem onClick={toAscendingPrice} button className={classes.nested}>
              <ListItemText primary={props.sorting_text[2]} />
            </ListItem>
          </List>
        </Collapse>
        <div className="product_cards">
          {products_array.map(function (
            item,
            index
          ) {
            return <SaleProductCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
