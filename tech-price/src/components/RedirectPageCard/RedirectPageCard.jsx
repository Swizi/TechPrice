import React from "react";
import { Link } from "react-router-dom";

export default function RedirectPageCard(props) {
  console.log(props.data);
  return (
    <Link className="card-link" to={`/RedirectPage`}>
      <div className="card-block">
        <span>{props.data}</span>
      </div>
    </Link>
  );
}
