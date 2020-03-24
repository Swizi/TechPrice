import React from "react";
import "./HelpCard.css";
import {Link} from "react-router-dom";

export default function HelpCard(props) {
  console.log(props.data);
  return (
    <Link className="help_link" to={`/HelpPage/${props.data.id}`}>
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
