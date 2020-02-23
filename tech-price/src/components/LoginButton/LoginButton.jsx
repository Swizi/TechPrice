import React, { useState } from "react";
import LoginButton from "@material-ui/core/Button";
import "../../pages/MainPage/MainPage.css";
import { withStyles } from "@material-ui/core/styles";
import "./LoginButton.css"

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function CustomButton(props) {
  const [isToggleOn, toToggle] = useState(false);

  const handleClick = () => {
    toToggle(!isToggleOn);
  };

  const StyledButton = withStyles({
    root: {
      backgroundColor: "#c9ffd9",
      borderRadius: "10px"
    },
  })(LoginButton);

  return (
    <StyledButton variant="outlined">
      {/* {isToggleOn ? "Войти" : "Зарегистрироваться"} */}
      Войти
    </StyledButton>
  );
}
