import React from "react";
import { Link } from "react-router-dom";

export default function RedirectPageCard(props) {
  console.log(props.data);
  return (
    <Link className="card-link" to={`/RedirectPage/${props.href_index}/${props.data.index}`}>
      <div>
        <span>{props.data}</span>
      </div>
    </Link>
  );
}
