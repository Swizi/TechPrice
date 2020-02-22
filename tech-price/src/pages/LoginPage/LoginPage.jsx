import React from "react";
import "./LoginPage.css";

export function LoginPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }

  return (
    <div className="page-flexbox">
      <div className="flex-button">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
