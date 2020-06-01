import React, { useState, useEffect } from "react";
import "./ProductPageInfo.css";
import Carousel from "nuka-carousel";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import CircularProgress from "@material-ui/core/CircularProgress";

import $ from "jquery";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon_button: {
    "&": {
      color: "#FFD600",
    },
  },
}));

export default function ProductPageInfo(props) {
  const classes = useStyles();

  console.log(props.data.favorite);

  const [isClicked, changeStyle] = useState(props.data.favorite);

  const [auth, setAuth] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $.post(
      `${props.host}/ajax/check_auth.php`,
      { target: "checking" },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status === 0) {
          setAuth(true);
        } else {
          setAuth(false);
        }
        setLoading(false);
      }
    );
  }, [props.host]);

  function changeFavoriteState(){
    if (!isClicked){
      setLoading(true);
      console.log(props.data.id);
      console.log(props.data.min_price);
      $.post(
        `${props.host}/ajax/favorites_change.php`,
        { target: "fav-put", item_id: props.data.id, price: props.data.min_price},
        function (data) {
          var response = $.parseJSON(data);
          console.log(response);
          setLoading(false);
        }
      );    
    } else {
      setLoading(true);
      $.post(
        `${props.host}/ajax/favorites_change.php`,
        { target: "fav-rem", item_id: props.data.id },
        function (data) {
          var response = $.parseJSON(data);
          console.log(response);
          setLoading(false);
        }
      );   
    }
  }

  return (
    <div className="product_description">
      <div className="product_description_header_block">
        <h1 className="product_page_header">{props.data.name}</h1>
        {loading ? (
          <CircularProgress className="add_list_circular_progress"/>
        ) : (
          <div
            className="favourite_button"
            onClick={() => {changeStyle(!isClicked); changeFavoriteState(); }}
            style={{ display: auth ? "flex" : "none" }}
          >
            <IconButton
              className={classes.icon_button}
            >
              {isClicked ? (
                <FavoriteIcon className="favorite_icon" />
              ) : (
                <FavoriteBorderIcon className="favorite_icon" />
              )}
            </IconButton>
          </div>
        )}
      </div>
      <Carousel
        slidesToShow={1}
        cellSpacing={10}
        dragging={true}
        pauseOnHover={true}
        className="product_images_carousel"
      >
        {props.data.urls.map(function (item, index) {
          return (
            <img
              key={index}
              className="product_page_image"
              src={item}
              alt={props.data.name}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
