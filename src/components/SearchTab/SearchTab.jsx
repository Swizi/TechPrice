import React, { useState, useContext, useEffect } from "react";
import "./SearchTab.css";
import SearchContext from "../.././SearchContext";
import CatalogContext from '../.././CatalogContext';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router-dom";

import { useFormik } from "formik";

import $ from "jquery";

const text_field_width = '90%';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    width: text_field_width
  },
  margin: {
    margin: theme.spacing(1),
    width: 200,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  error_text: {
    width: text_field_width,
    '& label, p': {
      color: 'red',
      width: text_field_width
    },
    "& > *": {
      margin: theme.spacing(1),
      width: text_field_width,
    },
  }
}));

const validate = values => {
  const errors = {};
  
  if (values.search_string == ''){
    errors.search_string = 'Пустой запрос!';
  }

  return errors;
};

export default function SearchTab(props) {
  let history = useHistory();
  const { searchCatalog, editSearchCatalog } = useContext(CatalogContext);
  const { isClicked, editSearchTab } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const formik = useFormik({
    initialValues: {
      search_string: '',
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      $.post(
        `${props.host}/ajax/get_content.php`,
        { target: "get-search", sobj: values.search_string },
        function (data) {
          var response = $.parseJSON(data);
          if (response.status != 0) {
            setRedirect(false);
          } else {
            var catalog = [];
            for (var i = 0; i < response.titles.length; i++){
              var item = {
                id: i,
                link: response.links[i],
                urls: [],
                popularity: i, // Это не работает, если что.(так не должно быть)
                name: response.titles[i],
                description: '',
                reviews: [],
                shops: []
              }
              item.urls.push(response.pics[i]);
              catalog.push(item);
            }
            editSearchCatalog({
              header: 'Результаты поиска',
              array: catalog
            });
            editSearchTab(!isClicked);
            setRedirect(true);
          }
          setLoading(false);
        }
      );
      // Здесь запрос на сервак
    },
  });

  const classes = useStyles();
  useEffect(() => {
    $("#standard-search").keypress(function (e) {
      if (e.which == 13) {
        //Enter key pressed
        return <Redirect to="/UserCityPage" />;
      }
    });
  });

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  if (redirect) {
    history.push("/ShopPage");
  }

  return (
    <div
      className="search_block"
      style={{ display: isClicked ? "flex" : "none" }}
    >
      <CloseIcon
        className="exit_icon"
        onClick={() => editSearchTab(!isClicked)}
      />
      <form className="search_query_form" autoComplete="on" onSubmit={formik.handleSubmit}>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.search_string}
          name="search_string"
          id="search_string"
          label=""
          className={formik.errors.search_string ? classes.error_text : classes.root}
          style={
            {
              color: formik.errors.search_string ? "red" : null,
            }
          }
          type="search"
          label=""
          helperText={formik.errors.search_string ? formik.errors.search_string : null}
          InputProps={{
            startAdornment: (
              <InputAdornment type="submit" position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}
