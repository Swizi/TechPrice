import React, { useContext, useState, useEffect } from "react";
import "./ProductPage.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProductPageDescription from "../../components/ProductPageDescription/ProductPageDescription";
import ProductPageInfo from "../../components/ProductPageInfo/ProductPageInfo";
import ProductPageReviews from "../../components/ProductPageReviews/ProductPageReviews";
import ProductPageShops from "../../components/ProductPageShops/ProductPageShops";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ItemContext from '../.././ItemContext';

import { Redirect } from "react-router-dom";
import $ from "jquery";

import CircularProgress from "@material-ui/core/CircularProgress";

export function ProductPage(props) {
  // const { item, setItem } = useContext(ItemContext);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  var href = window.location.href;
  href = href.split("/");
  var index = href[href.length - 1];
  var props_data = {};
  console.log(index);
  // if (/\d/.test(index)){
  //   props_data = props.data[index];
  // } else {
  //   props_data = item;
  // }

  useEffect(() => {
    $.post(
      `${props.host}/ajax/get_content.php`,
      { target: "get-item", item_id: index},
      function (data) {
        var response = $.parseJSON(data);
        console.log(response);
        if (response.status === 0 || response.status === 8 || response.status === 7) {
          // Ответ пришёл
          // if (response.pics.length === 2){
          //   pics_urls.push(response.pictures[0]);
          // } else {
          //   pics_urls = response.pictures;
          // }

          // var description_text = "";

          // for (var i = 0; i < response.description.length; i++) {
          //   description_text = description_text + response.description[i];
          //   description_text = description_text + " ; ";
          // }

          // // if (item_link[0] === 'a'){
          // //   item_link = "https://www.eldorado.ru/c" + item_link;
          // // } else {
          // //   item_link = "https://" + item_link;
          // // }

          // var item_product = {
          //   urls: pics_urls,
          //   popularity: 4, //random popularity
          //   name: response.title,
          //   description: description_text,
          //   reviews: [
          //     {
          //       id: 0,
          //       url: "https://is.gd/8AzG0h",
          //       name: "Egor Komaroff",
          //       review: "Всё понравилось, рекомендую.",
          //       isLiked: true,
          //     },
          //   ],
          //   shops: [
          //     {
          //       name: "Eldorado",
          //       price: response.el_price.replace(/[^0-9]/gim, ""),
          //       rating: 0,
          //       reviews: 0,
          //       link: item_link,
          //     },
          //   ],
          // };

          // if (response.status === 0) {
          //   if (response.mv_price !== "NULL") {
          //     item_product.shops.push({
          //       name: "Mvideo",
          //       price: response.mv_price.replace(/[^0-9]/gim, ""),
          //       rating: 0,
          //       reviews: 0,
          //       link: response.mv_link,
          //     });
          //   }
          // }

          // setItem(item_product);
          var pics_urls = response.pictures.split(";");
          var item_product = {
            id: response.id,
            urls: pics_urls,
            popularity: 4,
            name: response.title,
            description: response.description,
            min_price: response.min_price,
            favorite: response.favorite,
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
                price: response.el_price,
                rating: 0,
                reviews: 0,
                link: response.el_link,
              },
            ]         
          };

          if (response.mv_price != null){
            item_product.shops.push({
              name: "Mvideo",
              price: response.mv_price,
              rating: 0,
              reviews: 0,
              link: response.mv_link
            })
          }

          setItem(item_product);

        } else {
          setRedirect(true);
        }
        setLoading(false);
      }
    );
  }, []);
  let history = useHistory();

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

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
        <ProductPageInfo data={item} host={props.host}/>
        <Divider />
        <ProductPageDescription data={item} />
        <Divider />
        <ProductPageReviews data={item} />
        <ProductPageShops data={item} />
      </div>
    </div>
  );
}
