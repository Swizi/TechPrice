import React from "react";
import RedirectPageCard from "../../components/RedirectPageCard/RedirectPageCard";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./RedirectPage.css"

export function RedirectPage(props) {
  var href = window.location.href;
  href = href.split("/");
  var href_index = href[href.length - 1];
  let history = useHistory();
  return (
    <div className="page-flexbox">
      <div className="navigation-menu">
        <div className="default-menu-wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu-header-text">
            {props.catalog[href_index].name}
          </span>
        </div>
      </div>
      <div className="products">
        <div className="redirect-page-cards">
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
        </div>
      </div>
    </div>
  );
}
