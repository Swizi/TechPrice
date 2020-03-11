import React from "react";
import "./ProductPage.css";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProductPageInfo from "../../components/ProductPageInfo/ProductPageInfo";
import ProductPageReviews from "../../components/ProductPageReviews/ProductPageReviews";
import ProductPageShops from "../../components/ProductPageShops/ProductPageShops";
import Divider from "@material-ui/core/Divider";
import Carousel from "nuka-carousel";
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
    <div className="page-flexbox">
      <div className="navigation-menu">
        <div className="default-menu-wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu-header-text">Товар</span>
        </div>
      </div>
      <div className="product-page">
        <Divider />
        <div className="product-description">
          <Carousel
            slidesToShow={1}
            cellSpacing={10}
            dragging={true}
            withoutControls={true}
            pauseOnHover={true}
            className="product-images-carousel"
          >
            {props.data[index].urls.map(function(item, index) {
              return (
                <img
                  key={index}
                  className="product-page-image"
                  src={item}
                  alt={props.data[index].name}
                />
              );
            })}
          </Carousel>
          <h1 className="product-page-header">{props.data[index].name}</h1>
        </div>
        <Divider />
        <ProductPageInfo data={props.data[index]} />
        <Divider />
        <ProductPageReviews data={props.data[index]} />
        <ProductPageShops data={props.data[index]} />
      </div>
    </div>
  );
}
