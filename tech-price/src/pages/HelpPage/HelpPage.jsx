import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//C:\Users\denis\Desktop\TechPrice\tech-price\src\pages\SalesPage\SalesPage.jsx
//C:\Users\denis\Desktop\TechPrice\tech-price\src\components\SaleProductCard\SaleProductCard.jsx
import HelpCard from "../../components/HelpCard/HelpCard";
import "./HelpPage.css";

export function HelpPage(props) {
  console.log(props);
  var href = window.location.href;
  let history = useHistory();
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Помощь</span>
        </div>
      </div>
      <div className="products">
        <div className="help_cards">
          {props.help_data.map(function(item, index) {
            return <HelpCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
