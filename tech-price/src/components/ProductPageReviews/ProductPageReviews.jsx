import React from "react";
import "./ProductPageReviews.css";
import ProductPageReview from "../ProductPageReview/ProductPageReview"

export default function ProductPageReviews(props) {
  return (
    <div className="product-page-reviews">
      <h3 className="reviews-header">Отзывы</h3>
      <div className="product-page-user-reviews">
        {props.data.reviews.map(function(item, index) {
          return <ProductPageReview key={index} data={item} />;
        })}
      </div>
    </div>
  );
}
