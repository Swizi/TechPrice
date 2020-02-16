import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function CustomButton2(props) {
  const [isToggleOn, toToggle] = useState(false);

  const handleClick = () => {
      toToggle(!isToggleOn)
  }

  return (
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        {isToggleOn ? 'Войти' : 'Зарегистрироваться'}
      </Button>
  );
}
