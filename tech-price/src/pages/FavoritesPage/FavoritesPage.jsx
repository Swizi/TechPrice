import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaleProductCard from "../../components/SaleProductCard/SaleProductCard";

import CircularProgress from "@material-ui/core/CircularProgress";

import $ from "jquery";
export function FavoritesPage(props) {

  let history = useHistory();

  const [item_list, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  // Запрос на список желаемого

  useEffect(() => {
    $.post(
      `${props.host}/ajax/get_content.php`,
      { target: "get-fav" },
      function (data) {
        var response = $.parseJSON(data);
        console.log(response);
        if (response.status === 0){
          var catalog = [];
          for (var key in response){
            if (response[key].id){
              var item = {
                id: response[key].id,
                name: response[key].title,
                url: response[key].picture
              };
              catalog.push(item);
            }
          }
          setItemList(catalog);
        } else {
          console.log("Ошибка в запросе на избранные товары");
        }
        setLoading(false);
      }
      );


  }, []);

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }
  
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Список желаемого</span>
        </div>
      </div>
      <div className="products">
        <div className="product_cards">
          {item_list.map(function(item, index) {
            return <SaleProductCard key={index} data={item} onClick={() => {history.push(`/ProductPage/${item.id}`)}} />;
          })}
        </div>
      </div>
    </div>
  );
}
