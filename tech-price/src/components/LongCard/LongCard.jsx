import React from "react";
import "./LongCard.css";
import {Link} from "react-router-dom";

export default function LongCard(props) {
  var path = "";

  if(props.href_index){
    path = "/ShopPage/" + props.href_index + "/" + props.data.id;  
  } else {
    path = "/HelpPage/" + props.data.id;
  }
  
  return (
    <Link className="long_card_link" to={path}>
      <div className="long_card_block">
        <img
          className={props.href_index ? "image_style" : "big_image_style"}
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="long_card_text">{props.data.name}</span>
      </div>
    </Link>
  );
}
