import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaleProductCard from "../../components/SaleProductCard/SaleProductCard";
export function SalesPage(props) {

  let history = useHistory();
  
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Пригретые товары</span>
        </div>
      </div>
      <div className="products">
        <div className="product_cards">
          {props.data.map(function(item, index) {
            return <SaleProductCard key={index} data={item} onClick={() => {history.push("/")}} />;
          })}
        </div>
      </div>
    </div>
  );
}
