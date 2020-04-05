import React from "react";
import "./ProductPage.css";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProductPageDescription from "../../components/ProductPageDescription/ProductPageDescription";
import ProductPageInfo from "../../components/ProductPageInfo/ProductPageInfo";
import ProductPageReviews from "../../components/ProductPageReviews/ProductPageReviews";
import ProductPageShops from "../../components/ProductPageShops/ProductPageShops";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

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

export function ProductPage(props) {
  var href = window.location.href;
  href = href.split("/");
  var index = href[href.length - 1];
  console.log(index);
  let history = useHistory();
  const classes = useStyles();
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Товар</span>
        </div>
      </div>
      <div className="product_page">
        <ProductPageInfo data={props.data[index]}/>
        <Divider /> 
        <ProductPageDescription data={props.data[index]} />
        <Divider />
        <ProductPageReviews data={props.data[index]} />
        <ProductPageShops data={props.data[index]} />
      </div>
    </div>
  );
}
