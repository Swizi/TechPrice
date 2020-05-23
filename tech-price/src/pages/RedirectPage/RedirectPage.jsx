import React, { useState, useContext } from "react";
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

  const { searchCatalog, editSearchCatalog } = useContext(CatalogContext);
  const { subcategories, editSubcategories } = useContext(SubcategoriesContext);

  const [loading, setLoading] = useState(false);
  const [isClicked, editClicked] = useState(false);
  const [subcategory, setSubcategory] = useState({});

  let history = useHistory();

  if (isClicked) {
    setLoading(true);
    $.post(
      `${props.host}/ajax/get_content.php`,
      { target: "get-item-list", link: subcategory.link },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status === 0 || response.status === 8) {
          var catalog = [];
          for (var i = 0; i < response.titles.length; i++){
            var item = {
              id: i,
              link: response.links[i],
              urls: [],
              popularity: i, // Это не работает, если что(так не должно быть)
              name: response.titles[i],
              description: '',
              reviews: [],
              shops: []
            }
            item.urls.push(response.pics[i]);
            catalog.push(item);
          }
          editSearchCatalog({
            header: subcategory.name,
            array: catalog
          });
          history.push("/ShopPage")
        } else {
          // Ошибочка вышла
        }
        setLoading(false);
      }
    );
    editClicked(false);
  }

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
