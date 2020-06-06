import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import SaleProductCard from "../../components/SaleProductCard/SaleProductCard";

import CatalogContext from "../.././CatalogContext";
import ItemContext from "../.././ItemContext";

import $ from "jquery";

import CircularProgress from "@material-ui/core/CircularProgress";

import "./ShopPage.css";

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

  const [loading, setLoading] = useState(true);
  const [isClicked, editClicked] = useState(false);
  const [product, setProduct] = useState({});
  const [header, setHeader] = useState(searchCatalog.header);

  var href = window.location.href;
  href = href.split("/");
  var href_index = href[href.length - 2];
  var products = [];

  var address = window.location.href;
  var address_array = address.split('/');
  var href_id = address_array[address_array.length-1];


  const [products_array, setProducts] = useState(products);

  useEffect(() => {
    $.post(
      `${props.host}/ajax/get_content.php`,
      { target: "get-item-list", subcateg_id: href_id },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status === 0 || response.status === 8) {
          var catalog = [];
          for (var key in response){
            if ((key !== "status") && (key !== "subcategory")){
              var item = {
                id: response[key].id,
                name: response[key].title,
                url: response[key].picture
              }
              catalog.push(item);
            }
          }
          setHeader(response.subcategory);
          editSearchCatalog({ ...searchCatalog,
            array: catalog
          });
          setProducts(catalog);
        } else {
          // Ошибочка вышла
        }
        setLoading(false);
      }
    ); 
  }, []);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  // const toDescendingPrice = () => {
  //   var prices = [];
  //   for (var i = 0; i < products.length; i++) {
  //     prices.push(products[i].shops[0].price);
  //   }

  //   var sorted_array = [];
  //   for (var i = 0; i < products.length; i++) {
  //     for (var j = 0; j < products.length; j++) {
  //       if (prices[i] === products[j].shops[0].price) {
  //         sorted_array.push(products[j]);
  //       }
  //     }
  //   }

  //   products = sorted_array;


  //   setProducts(products);
  // };

  // const toAscendingPrice = () => {
  //   var prices = [];
  //   for (var i = 0; i < products.length; i++) {
  //     prices.push(products[i].shops[0].price);
  //   }

  //   var sorted_array = [];
  //   for (var i = 0; i < products.length; i++) {
  //     for (var j = 0; j < products.length; j++) {
  //       if (prices[i] === products[j].shops[0].price) {
  //         sorted_array.push(products[j]);
  //       }
  //     }
  //   }

  //   products = sorted_array;


  //   setProducts(products);
  // };

  // const toPopularity = () => {
  //   var popularity_array = [];
  //   for (var i = 0; i < products.length; i++) {
  //     popularity_array.push(products[i].popularity);
  //   }

  //   var sorted_array = [];
  //   for (var i = 0; i < products.length; i++) {
  //     for (var j = 0; j < products.length; j++) {
  //       if (popularity_array[i] === products[j].popularity) {
  //         sorted_array.push(products[j]);
  //       }
  //     }
  //   }

  //   products = sorted_array;


  //   setProducts(products);
  // };

  if (isClicked) {
    history.push(`/ProductPage/${product.id}`);
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
          <IconButton
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            {header}
          </span>
        </div>
      </div>
      <div className="products">
        <div className="product_cards">
          <h2
            className="text_not_found"
            style={{
              display:
                !searchCatalog.array && !/\d/.test(href_index)
                  ? "block"
                  : "none",
            }}
          >
            {" "}
            По вашему запросу ничего не найдено
          </h2>
          {products_array.map(function (product_item, index) {
            return (
              <SaleProductCard
                onClick={() => {
                  setProduct(product_item);
                  editClicked(true);
                }}
                key={index}
                data={product_item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
