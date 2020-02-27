import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import "./MainPage.css";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// import { Router } from "react-router-dom"
// import {createBrowserHistory} from 'history'

// const history = createBrowserHistory()

// import { useHistory } from 'react-router-dom';

// function routeChange() {
//     let path = `../LoginPage/LoginPage.jsx`;
//     let history = useHistory();
//     history.push(path);
//   }

const options = [
  "Москва",
  "Санкт-Петербург",
  "Краснодар",
  "Калининград",
  "Севастополь",
  "Симферополь",
  "Казань",
  "Чебоксары",
  "Нижний Новгород",
  "Крымск",
  "Анапа",
  "Новороссийск",
  "Долинск",
  "Йошкар-Ола"
];

const ITEM_HEIGHT = 48;

export function MainPage(props) {
  // const headerTextStyle = {
  //   color: "red"
  // }
  var city = "Йошкар-Ола";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
    console.log(event.currentTarget.textContent);
    city = event.currentTarget.textContent;
    // Меняется список товаров на главной странице + весь поиск идёт только по этому городу
  };

  return (
    <div className="page-flexbox">
      <div className="flex-button">
        {/* <CustomButton />  */}
        <a href="/LoginPage">
          <LoginButton />
        </a>
      </div>
      <div className="flex-box">
        <span className="header-text"> TechPrice </span>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === "Йошкар-Ола"}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
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
