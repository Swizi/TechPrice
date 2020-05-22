import React, { useContext } from "react";
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

import CatalogContext from "../.././CatalogContext";
import ItemContext from '../.././ItemContext';

import { Redirect } from "react-router-dom";

import $ from 'jquery';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function ShopPage(props) {
  const classes = useStyles();
  let history = useHistory();

  const { searchCatalog, editSearchCatalog } = useContext(CatalogContext);
  const { item, setItem } = useContext(ItemContext);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [goBack, setGoBack] = React.useState(false);
  const [isClicked, editClicked] = React.useState(false);
  const [product, setProduct] = React.useState({});

  console.log(props);
  var href = window.location.href;
  href = href.split("/");
  var items_index = href[href.length - 1];
  var href_index = href[href.length - 2];
  console.log(href_index);
  console.log(props.catalog[href_index]);
  var products = [];
  var isSearchQuery = /\d/.test(href_index);
  if (/\d/.test(href_index)) {
    products = props.catalog[href_index].items[items_index].items;
  } else {
    products = searchCatalog;
  }

  const [products_array, setProducts] = React.useState(products);

  const handleClick = () => {
    setOpen(!open);
  };

  const toDescendingPrice = () => {
    var prices = [];
    for (var i = 0; i < products.length; i++) {
      prices.push(products[i].shops[0].price);
    }
    console.log(prices.sort((a, b) => a - b));

    // products sort by prices array

    var sorted_array = [];
    for (var i = 0; i < products.length; i++) {
      for (var j = 0; j < products.length; j++) {
        if (prices[i] === products[j].shops[0].price) {
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
    for (var i = 0; i < products.length; i++) {
      prices.push(products[i].shops[0].price);
    }
    console.log(prices.sort((a, b) => b - a));

    // products sort by prices array

    var sorted_array = [];
    for (var i = 0; i < products.length; i++) {
      for (var j = 0; j < products.length; j++) {
        if (prices[i] === products[j].shops[0].price) {
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
    for (var i = 0; i < products.length; i++) {
      popularity_array.push(products[i].popularity);
    }
    console.log(popularity_array.sort((a, b) => b - a));

    // products sort by prices array

    var sorted_array = [];
    for (var i = 0; i < products.length; i++) {
      for (var j = 0; j < products.length; j++) {
        if (popularity_array[i] === products[j].popularity) {
          sorted_array.push(products[j]);
        }
      }
    }

    products = sorted_array;

    console.log(products);

    setProducts(products);
  };

  if (goBack) {
    return <Redirect to="/" />;
  }

  if (isClicked){
    if (!/\d/.test(href_index)) {
      setLoading(true);
      $.post(`${props.host}/ajax/get_content.php`, { target: 'get-item', link: product.link }, function (data) {
        var response = $.parseJSON(data);
        console.log(response);
        if ((response.status == 0) || (response.status == 8)) {
          // Ответ пришёл 
          console.log('Картинки - ', response.pics);
          var item_link = product.link;
          item_link = item_link.slice(2);

          var description_text = '';
          
          for (var i = 0; i < response.description.length; i++){
            description_text = description_text + response.description[i];
            description_text = description_text + " ; ";
          }

          var item_product = {
            urls: response.pics,
            popularity: 4, //random popularity
            name: response.title,
            description: description_text,
            reviews: [
              {
                id: 0,
                url: "https://is.gd/8AzG0h",
                name: "Egor Komaroff",
                review: "Всё понравилось, рекомендую.",
                isLiked: true,
              },
            ],
            shops: [
              {
                name: "Eldorado",
                price: response.el_price.replace(/[^0-9]/gim, ''),
                rating: 0,
                reviews: 0,
                link: "https://" + item_link
              }
            ]
          };

          if (response.status == 0){
            if (response.mv_price != null) {
              item_product.shops.push({
                name: "Mvideo",
                price: response.mv_price.replace(/[^0-9]/gim, ''),
                rating: 0,
                reviews: 0,
                link: response.mv_link
              });
            }
          }

          alert("Entered");

          setItem(item_product);

          alert("Closed");

          // Формировка переменной для отправки на ProductPage
          // return <ProductPage data={formatted_data} />
          history.push("/");
          history.push("/ProductPage");
        } else {
          // Ошибочка вышла
        }
        setLoading(false);
      });
    } else {
      history.push("/");
      history.push(`/ProductPage/${product.id}`);
      // return <Redirect to={`/ProductPage/${product.id}`} />
    }  
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
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={/\d/.test(href_index) ? () => history.goBack() : () => setGoBack(true)} > 
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            {href_index.match(/^\d+$/)
              ? props.catalog[href_index].items[items_index].name
              : "Результат поиска"}
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
            <ListItem
              onClick={toDescendingPrice}
              button
              className={classes.nested}
            >
              <ListItemText primary={props.sorting_text[1]} />
            </ListItem>
            <ListItem
              onClick={toAscendingPrice}
              button
              className={classes.nested}
            >
              <ListItemText primary={props.sorting_text[2]} />
            </ListItem>
          </List>
        </Collapse>
        <div className="product_cards">
          {products_array.map(function (product_item, index) {
            return <SaleProductCard onClick={() => { setProduct(product_item); editClicked(true)}} key={index} data={product_item} />;
          })}
        </div>
      </div>
    </div>
  );
}
