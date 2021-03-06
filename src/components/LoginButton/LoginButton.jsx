import React from "react";
import LoginButton from "@material-ui/core/Button";
import "../../pages/MainPage/MainPage.css";
import { withStyles } from "@material-ui/core/styles";
import "./LoginButton.css"

export default function CustomButton(props) {

  const StyledButton = withStyles({
    root: {
      backgroundColor: "#c9ffd9",
      borderRadius: "10px"
    },
  })(LoginButton);

  return (
    <StyledButton variant="outlined">
      Войти
    </StyledButton>
  );
}
