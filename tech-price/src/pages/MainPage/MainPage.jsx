import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import "./MainPage.css";

// import { Router } from "react-router-dom"
// import {createBrowserHistory} from 'history'

// const history = createBrowserHistory()

// import { useHistory } from 'react-router-dom';

// function routeChange() {
//     let path = `../LoginPage/LoginPage.jsx`;
//     let history = useHistory();
//     history.push(path);
//   }

export function MainPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }

  return (
    <div className="page-flexbox">
      <div className="flex-button">
        {/* <CustomButton />  */}
        <a href="../LoginPage/LoginPage">
          <LoginButton />
        </a>
      </div>
      <div className="flex-box">
        <span className="header-text"> TechPrice </span>
        <span className="city-text"> Йошкар - Ола </span>
      </div>
      <TextField
        className="text-field"
        label="Искать товары"
        variant="outlined"
        InputProps={{
          // className: 'text-field',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <div className="products">
        <p className="items-header">Наиболее просматриваемые товары:</p>
        <div className="product-cards">
          {props.data.map(function(item, index) {
            return <ProductCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
