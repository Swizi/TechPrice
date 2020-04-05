import React from "react";
import "./ProductPageDescription.css";

export default function ProductPageDescription(props) {
  return (
    <div className="product_page_info">
      <h3 className="info_header">Информация о товаре</h3>
      <p className="info_text">
        {props.data.description}
      </p>
    </div>
  );
}
