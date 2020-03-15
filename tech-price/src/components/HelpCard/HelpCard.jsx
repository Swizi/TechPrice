import React from "react";
import "./HelpCard.css";
import {Link} from "react-router-dom";

export default function HelpCard(props) {
  console.log(props.data);
  return (
    <Link className="help-link" to={`/FeedbackPage`}>
      <div className="help-block">
        <img
          className="image-style"
          src={props.data.url}
          alt={props.data.name}
        />
        <span className="help-text">{props.data.name}</span>
      </div>
    </Link>
  );
}
