import React from "react";
import "./ProductPageShops.css";
import ShopCard from "../ShopCard/ShopCard";

export default function ProductPageShops(props) {
  // var shops = props.data.shops;
  // var shops_price = [];
  // for (let i = 0; i < shops.length; i++) {
  //   shops_price.push(shops[i].price);
  // }

  // shops_price = shops_price.sort((a, b) => a - b);

  // var sorted_array = [];
  // for (let i  = 0; i < shops.length; i++) {
  //   for (let j = 0; j < shops.length; j++){
  //     if (shops_price[i] === shops[j].price) {
  //       sorted_array.push(shops[j]);
  //     }      
  //   }
  // }

  return (
    <div className="product_page_price_block">
      <h3 className="price_header">Цены и магазины</h3>
      <div className="prices_block">
        {props.data.shops.map(function (item, index) {
          return <ShopCard data={item} key={index} />;
        })}
      </div>
    </div>
  );
}
