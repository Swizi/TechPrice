import React, { useState, useContext, useEffect } from "react";
import RedirectPageCard from "../../components/RedirectPageCard/RedirectPageCard";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./RedirectPage.css";

import CatalogContext from "../.././CatalogContext";
import SubcategoriesContext from '../.././SubcategoriesContext';

import $ from "jquery";

import CircularProgress from "@material-ui/core/CircularProgress";

export function RedirectPage(props) {

  var address = window.location.href;
  var address_array = address.split('/');
  var href_id = address_array[address_array.length-1];

  const { searchCatalog, editSearchCatalog } = useContext(CatalogContext);
  const [ subcategory_list, setSubcategoryList] = useState({
    header: '',
    array: []
  });
  const [subcategories, editSubcategories] = useState({
    header: "",
    array: []
  });

  const [loading, setLoading] = useState(true);
  const [isClicked, editClicked] = useState(false);
  const [subcategory, setSubcategory] = useState({});

  let history = useHistory();

  useEffect(() => {
    $.post(`${props.host}/ajax/get_content.php`, { target: 'get-subcateg', categ_id: href_id }, function (data) {
      var response = $.parseJSON(data);
      if ((response.status === 0) || (response.status === 8)) {
        // Ответ пришёл 
        var subcategory_array = [];
        for (var key in response){
          var item = {
            id: response[key].id,
            name: response[key].title,
            url: response[key].picture
          };
          if (item.id !== undefined){
            subcategory_array.push(item);
          }
        }
        editSubcategories({ header: props.catalog[href_id].name, array:subcategory_array});
      } else {
        console.log("Ошибка при отправке запроса на сервер(запрос на получение подкатегорий)");
      }
      setLoading(false);
    });   
  }, []);

  useEffect(() => {
    if (isClicked) {
      history.push(`/ShopPage/${subcategory.id}`);
    }
  }, [isClicked]);

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
          <span className="menu_header_text">
            {subcategories.header}
          </span>
        </div>
      </div>
      <div className="products">
        <div className="redirect_page_cards">
          {subcategories.array.map(function (item, index) {
            return (
              <RedirectPageCard
                onClick={() => {
                  setSubcategory(item);
                  editClicked(true);
                }}
                key={index}
                data={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
