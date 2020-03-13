import React from "react";
import { Link } from "react-router-dom";
import "./RedirectPageCard.css"

export default function RedirectPageCard(props) {
  console.log(props.data);
  return (
    <Link
      className="card-link"
      to={`/ShopPage/${props.href_index}/${props.data.id}`}
    >
      <span className="redirect-page-card-text">{props.data.name}</span>
    </Link>
  );
}
