import React from "react";
import "./ItemsCard.css";
import {Link} from "react-router-dom";

export default function ItemsCard(props) {
  console.log(props.data);
  return (
    <Link className="card-link" to={`/RedirectPage/${props.data.id}`}>
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
