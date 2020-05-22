import React from "react";
import "./ShopCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StarBorderIcon from "@material-ui/icons/StarBorder";


export default function ShopCard(props) {
  return (
    <div className="shop_card">
      <div className="shop_description">
        <span className="price_text">{props.data.price} рублей</span>
        <span className="price_name">{props.data.name}</span>
        <div className="shop_rating_block">
          <div className="shop_rating">{props.data.rating}</div>
          {/* <div className="shop-rating-square"></div> */}
          <span className="shop_reviews_count">
            {props.data.reviews} отзывов
          </span>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        className="shop_button"
        href={props.data.link}
        target="_blank"
      >
        Перейти
      </Button>
    </div>
  );
}
