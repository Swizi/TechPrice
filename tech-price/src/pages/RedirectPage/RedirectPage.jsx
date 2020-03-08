import React from "react";
import RedirectPageCard from "../../components/RedirectPageCard/RedirectPageCard";

export function RedirectPage(props) {
  var href = window.location.href;
  href = href.split("/");
  var index = href[href.length - 1];
  return (
    <div className="page-flexbox">
      <div className="products">
        <div className="product-cards">
          {props.catalog[index].items.map(function(item, index) {
            return <RedirectPageCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
