import React, { useContext } from "react";
import "./CityCard.css";

import UserContext from '../.././UserContext';

export default function CityCard(props) {

  const {userCity, setCity} = useContext(UserContext);

  var textStyle = {};
  if (userCity === props.data.city){
    textStyle = {
      color: "#FFD600"
    }
  }

  const changeLocation = () => {
    setCity(props.data.city);
  }

  return (
    <div className="city_card_block" onClick={changeLocation}>
      <h2 style={textStyle} className="default_gray_text">{props.data.city}</h2>
      <hr className="hr"/>
    </div>
  );
}

