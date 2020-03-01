import React from "react";
import "./ProductPageReview.css";

export default function ProductPageReview(props) {
  var isLiked = props.data.isLiked;
  return (
    <div className={`product-user-review-block ${!isLiked && 'markedClass'}`} >
      <div className="product-user">
        <img
          className="product-user-image"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product-user-name">{props.data.name}</span>
      </div>
      <span className="product-user-review-text">{props.data.review}</span>
    </div>
  );
}
