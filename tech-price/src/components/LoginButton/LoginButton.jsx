import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./LoginButton.css"

export default function CustomButton2(props) {
  const [isToggleOn, toToggle] = useState(false);

  const handleClick = () => {
      toToggle(!isToggleOn)
  }

  return (
      <Button
        className="enter-button"
        variant="outlined"
        onClick={handleClick}
      >
        {isToggleOn ? 'Войти' : 'Зарегистрироваться'}
      </Button>
  );
}
