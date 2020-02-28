import React from "react";
import "./ProductPageShops.css";
import ShopCard from "../ShopCard/ShopCard";

export default function ProductPageShops(props) {
  return (
    <div className="product-page-price-block">
      <h3>Цены и магазины</h3>
      <div className="prices-block">
        {/* {props.data.reviews.map(function(item, index) {
          return <ShopCard key={index} data={item} />;
        })} */}
      </div>
    </div>
  );
}
