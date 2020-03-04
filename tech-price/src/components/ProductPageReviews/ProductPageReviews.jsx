import React from "react";
import Carousel from "nuka-carousel";
import "./ProductPageReviews.css";
import ProductPageReview from "../ProductPageReview/ProductPageReview";

export default function ProductPageReviews(props) {
  return (
    <div className="product-page-reviews">
      <h3 className="reviews-header">Отзывы</h3>
      <Carousel slidesToShow={1} cellSpacing={10} dragging={true} withoutControls={true} pauseOnHover={true} opacityScale={1} className="product-page-user-reviews">
          {props.data.reviews.map(function(item, index) {
            return <ProductPageReview key={index} data={item} />;
          })}
      </Carousel>
    </div>
  );
}
