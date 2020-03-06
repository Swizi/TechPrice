import React from "react";
import "./ProductCard.css";
import {Link} from "react-router-dom";

export default function ProductCard(props) {
  console.log(props.data);
  return (
    <Link className="card-link" to={`/ProductPage/${props.data.id}`}>
      <div className="card-block">
        <img
          className="image-style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product-name">{props.data.name}</span>
      </div>
    </Link>
  );
}
