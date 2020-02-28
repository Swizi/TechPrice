import React from "react";
import "./ProductPageReview.css";

export default function ProductPageReview(props) {
  var isLiked = props.data.isLiked;
  console.log(props.data.name, " ", isLiked);
//   function paint() {
//     if (isLiked === true) {
//       document.getElementsByClassName(
//         "product-user-review-block"
//       ).style.backgroundColor = "#c9ffd9";
//     } else {
//       document.getElementsByClassName(
//         "product-user-review-block"
//       ).style.backgroundColor = "red";
//     }
//   }
  return (
    <div className="product-user-review-block">
      <div className="product-user">
        <img
          className="product-user-image"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product-user-name">{props.data.name}</span>
      </div>
      <div className="product-user-review-text">{props.data.review}</div>
    </div>
  );
}
