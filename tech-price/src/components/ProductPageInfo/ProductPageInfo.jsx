import React from "react";
import "./ProductPageInfo.css";

export default function ProductPageInfo(props) {
  return (
    <div className="product-page-info">
      <h3 className="info-header">Информация о товаре</h3>
      <p className="info-text">
        {props.data.description}
      </p>
    </div>
  );
}
