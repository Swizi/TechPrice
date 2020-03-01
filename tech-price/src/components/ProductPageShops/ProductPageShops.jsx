import React from "react";
import "./ProductPageShops.css";
import ShopCard from "../ShopCard/ShopCard";

export default function ProductPageShops(props) {
  return (
    <div className="product-page-price-block">
      <h3 className="price-header">Цены и магазины</h3>
      <div className="prices-block">
        {props.data.shops.map(function(item, index) {
          return (
            <React.Fragment key={index}>
              <hr className="hr" />
              <ShopCard data={item} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
