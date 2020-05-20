import React, { useContext, useEffect } from "react";
import "./SearchTab.css";
import SearchContext from "../.././SearchContext";
import CatalogContext from '../.././CatalogContext';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Redirect } from "react-router-dom";

import { useFormik } from "formik";

import $ from "jquery";

const text_field_width = '90%';

const text_field_100 = '100%';

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
  if (/[1-9]$/g.test(values.search_string)){
    errors.search_string = 'Запрос не может состоять из цифр';
  }

  if (values.search_string == ''){
    errors.search_string = 'Пустой запрос!';
  }

  return errors;
};

export default function SearchTab(props) {
  const { searchCatalog, editSearchCatalog } = useContext(CatalogContext);
  const { isClicked, editSearchTab } = useContext(SearchContext);
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  console.log("isClicked = ", isClicked);

  const formik = useFormik({
    initialValues: {
      search_string: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setLoading(true);
      $.post(
        `${props.host}/ajax/get_content.php`,
        { target: "get-search", sobj: values.search_string },
        function (data) {
          var response = $.parseJSON(data);
          console.log(response);
          if (response.status != 0) {
            console.log("error");
            setRedirect(false);
          } else {
            console.log("OK");
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
            editSearchCatalog(catalog);
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
        alert("МДА, ПИЗДА!");
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
    return <Redirect to="/ShopPage" />
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
          className={formik.errors.search_string ? classes.error_text : classes.root}
          style={
            {
              color: formik.errors.search_string ? "red" : null
            }
          }
          type="search"
          label="Поиск"
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
