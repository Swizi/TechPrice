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
            color: "#FFD600"
        },
    },
  }));

export default function ProductPageInfo(props) {
    const classes = useStyles();

  const [isClicked, changeStyle] = useState(false);

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
  return (
    <div className="product_description">
      <div className="product_description_header_block">
        <h1 className="product_page_header">{props.data.name}</h1>
        {loading ? (
          <CircularProgress className="circular_progress" />
        ) : (
          <div
            className="favourite_button"
            onClick={() => changeStyle(!isClicked)}
          >
            <IconButton className={classes.icon_button}>
              {isClicked ? (
                <FavoriteIcon
                  className="favorite_icon"
                  style={{ display: !auth ? "flex" : "none" }}
                />
              ) : (
                <FavoriteBorderIcon
                  className="favorite_icon"
                  style={{ display: !auth ? "flex" : "none" }}
                />
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
