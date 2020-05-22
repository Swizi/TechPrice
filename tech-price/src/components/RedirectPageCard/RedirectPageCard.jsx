import React from "react";
import { Link } from "react-router-dom";
import "./RedirectPageCard.css";

export default function RedirectPageCard(props) {
  console.log(props.data);
  return (
    <div
      className="card_link"
      onClick={props.onClick}
      // to={`/ShopPage/${props.href_index}/${props.data.id}`}
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
