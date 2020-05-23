import React from "react";
import "./SaleProductCard.css";

export default function SaleProductCard(props) {

  return (
    <div className="card_link" onClick={props.onClick}>
      <div className="card_block_search">
        <img
          className="image_style"
          src={props.data.urls[0]}
          alt={props.data.name}
        />
        <span className="product_name">{props.data.name}</span>
      </div>
    </div>
  );
}
