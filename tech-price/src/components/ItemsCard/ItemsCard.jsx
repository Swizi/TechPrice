import React from "react";
import "./ItemsCard.css";
import {Link} from "react-router-dom";

export default function ItemsCard(props) {
  console.log(props.data);
  return (
    <Link className="card_link" to={`/RedirectPage/${props.data.id}`}>
      <div className="card_block">
        <img
          className="image_style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="product_name">{props.data.name}</span>
      </div>
    </Link>
  );
}
