import React, { useContext } from "react";
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
import ItemContext from '../.././ItemContext';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300,
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
  const { item, setItem } = useContext(ItemContext);

  var href = window.location.href;
  href = href.split("/");
  var index = href[href.length - 1];
  console.log(index);
  var props_data = {};
  if (/\d/.test(index)){
    props_data = props.data[index];
  } else {
    props_data = item;
  }
  let history = useHistory();
  console.log(props_data);
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
        <ProductPageInfo data={props_data} host={props.host}/>
        <Divider />
        <ProductPageDescription data={props_data} />
        <Divider />
        <ProductPageReviews data={props_data} />
        <ProductPageShops data={props_data} />
      </div>
    </div>
  );
}
