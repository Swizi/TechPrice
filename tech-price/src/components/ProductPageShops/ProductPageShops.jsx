import React from "react";
import "./ProductPageShops.css";
import ShopCard from "../ShopCard/ShopCard";
import Divider from "@material-ui/core/Divider";

export default function ProductPageShops(props) {
  return (
    <div className="product-page-price-block">
      <h3 className="price-header">Цены и магазины</h3>
      <div className="prices-block">
        {props.data.shops.map(function(item, index) {
          return (
            <React.Fragment key={index}>
              <Divider />
              <ShopCard data={item} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
