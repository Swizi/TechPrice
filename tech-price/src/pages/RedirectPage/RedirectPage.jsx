import React from "react";
import RedirectPageCard from "../../components/RedirectPageCard/RedirectPageCard";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./RedirectPage.css";
import LongCard from "../../components/LongCard/LongCard";

export function RedirectPage(props) {
  var href = window.location.href;
  href = href.split("/");
  var href_index = href[href.length - 1];
  let history = useHistory();
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            {props.catalog[href_index].name}
          </span>
        </div>
      </div>
      <div className="products">
        {/* <div className="redirect_page_cards">
          {props.catalog[href_index].items.map(function(item, index) {
            return (
              <React.Fragment>
                <RedirectPageCard
                  key={index}
                  data={item}
                  href_index={href_index}
                />
                <hr className="hr" />
              </React.Fragment>
            );
          })}
        </div> */}
        <div className="help_cards">
          {props.catalog[href_index].items.map(function(item, index) {
            return <LongCard key={index} data={item} href_index={href_index} />;
          })}
        </div>
      </div>
    </div>
  );
}
