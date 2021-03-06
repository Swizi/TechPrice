import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import FAQCard from "../../components/FAQCard/FAQCard";
import "./FAQPage.css"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export function FAQPage(props) {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">​Часто задаваемые вопросы</span>
        </div>
      </div>
      <div className="faqs_block">
        <List component="nav" className={classes.root}>
          {props.faq.map(function(item, index) {
            return (
              <React.Fragment key={index}>
                <FAQCard data={item} />
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </div>
  );
}
