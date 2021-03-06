import React from "react";
import "./ProductPageDescription.css";

export default function ProductPageDescription(props) {
  var array_string_description = props.data.description.split(";");
  var array_array_description = [], external_array = [];
  for (var i = 0; i < array_string_description.length; i++) {
    if (i % 2 === 0) {
      external_array = [];
    }
    external_array.push(array_string_description[i]);
    if (external_array.length === 2) {
      array_array_description.push(external_array);
    }
  }
  return (
    <div className="product_page_info">
      <h3 className="info_header">Информация о товаре</h3>
      <div className="info_text">
        <ul className="description_list">
          {array_array_description.map(function (item, index) {
            return <li key={index} className="description_list_item"><p>{item[0]}</p><p>{item[1]}</p></li>;
          })}
        </ul>
      </div>
    </div>
  );
}
