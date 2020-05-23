import React from "react";
import "./RedirectPageCard.css";
import "./../ProductCard/ProductCard.css";

export default function RedirectPageCard(props) {
  return (
    <div
      className="card_link"
      onClick={props.onClick}
    >
      <div className="card_block">
        <img
          className="image_style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product_name">{props.data.name}</span>
      </div>
    </div>
  );
}
