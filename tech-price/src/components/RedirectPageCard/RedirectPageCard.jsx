import React from "react";
import { Link } from "react-router-dom";
import "./RedirectPageCard.css";

export default function RedirectPageCard(props) {
  console.log(props.data);
  return (
    <Link
      className="card_link"
      to={`/ShopPage/${props.href_index}/${props.data.id}`}
    >
      <span className="redirect_page_card_text">{props.data.name}</span>
    </Link>
  );
}
