import React from "react";
import "./ItemsCard.css";

export default function ItemsCard(props) {
  return (
    <div className="long_card_link" onClick={props.onClick}>
      <div className="long_card_block">
        <img
          className="big_image_style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="long_card_text">{props.data.name}</span>
      </div>
    </div>
  );
}
