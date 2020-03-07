import React from "react";
import RedirectPageCard from "../../components/RedirectPageCard/RedirectPageCard"

export function RedirectPage(props) {
  console.log(props.catalog.items);
  return (
    <div className="page-flexbox">
      <div className="products">
        {/* <div className="product-cards">
          {props.catalog.items.map(function(item, index) {
            return <RedirectPageCard key={index} data={item} />;
          })}
        </div> */}
      </div>
    </div>
  );
}
