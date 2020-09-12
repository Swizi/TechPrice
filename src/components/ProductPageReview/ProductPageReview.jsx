import React from "react";
import "./ProductPageReview.css";

export default function ProductPageReview(props) {
  var isLiked = props.data.isLiked;
  return (
    <div className={`product_user_review_block ${!isLiked && 'markedClass'}`} >
      <div className="product_user">
        <img
          className="product_user_image"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product_user_name">{props.data.name}</span>
      </div>
      <span className="product_user_review_text">{props.data.review}</span>
    </div>
  );
}
