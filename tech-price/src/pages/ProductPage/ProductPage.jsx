import React from "react";
import "./ProductPage.css";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { variableDeclarator } from "@babel/types";
import ProductPageInfo from "../../components/ProductPageInfo/ProductPageInfo";
import ProductPageReviews from "../../components/ProductPageReviews/ProductPageReviews";
import ProductPageShops from "../../components/ProductPageShops/ProductPageShops";

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
  const classes = useStyles();
  return (
    <div className="page-flexbox">
      <div className="menu-navigation">
        <a href="/">
          <ArrowBackIcon />
        </a>
        <a href="/">
          <HomeIcon />
        </a>
      </div>
      <div className="product-page">
        <hr className="hr" />
        <div className="product-description">
          <img
            className="product-page-image"
            src={props.data[index].url}
            alt={props.data[index].name}
          />
          <h1 className="product-page-header">{props.data[index].name}</h1>
        </div>
        <hr className="hr" />
        <ProductPageInfo data={props.data[index]} />
        <hr className="hr" />
        <ProductPageReviews data={props.data[index]} />
        <ProductPageShops data={props.data[index]} />
      </div>
    </div>
  );
}