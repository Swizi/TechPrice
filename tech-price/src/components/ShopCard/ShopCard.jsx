import React from "react";
import "./ShopCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StarBorderIcon from "@material-ui/icons/StarBorder";


export default function ShopCard(props) {
  return (
    <div className="shop-card">
      <div className="shop-description">
        <span className="price-text">{props.data.price}</span>
        <span className="price-name">{props.data.name}</span>
        <div className="shop-rating-block">
          <StarBorderIcon className="star-icon" />
          <div className="shop-rating">{props.data.rating}</div>
          {/* <div className="shop-rating-square"></div> */}
          <span className="shop-reviews-count">
            {props.data.reviews} отзывов
          </span>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        className="shop-button"
        href={props.data.link}
      >
        Перейти
      </Button>
    </div>
  );
}
