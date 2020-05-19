import React from "react";
import "./LongCard.css";
import {Link} from "react-router-dom";

export default function LongCard(props) {
  console.log(props.data);
  var path = "";
  var block_id = props.data.block_id;
  // if (block_id == 1){
  //   path = "`/ShopPage/${props.href_index}/${props.data.id}`"
  // } else if (block_id == 0){
  //   path = "`/HelpPage/${props.data.id}`"
  // }
  // if (block_id == 1){
  //   path = "/ShopPage/" + props.href_index + "/" + props.data.id;
  // } else if (block_id == 0){
  //   path = "/HelpPage/" + props.data.id;
  // }
  path = "/ShopPage/" + props.href_index + "/" + props.data.id;
  
  return (
    <Link className="help_link" to={path}>
      <div className="help_block">
        <img
          className="image_style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="help_text">{props.data.name}</span>
      </div>
    </Link>
  );
}
