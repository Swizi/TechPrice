import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return ( <
    Link className = "card_link"
    to = { `/ProductPage/${props.data.id}` } >
    <
    div className = "card_block" >
    <
    img className = "image_style"
    src = { props.data.url }
    alt = { props.data.name }
    />{" "} <
    span className = "product_name" > { props.data.name } < /span>{" "} <
    /div>{" "} <
    /Link>
  );
}