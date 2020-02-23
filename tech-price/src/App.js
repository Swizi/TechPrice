import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import {LoginPage} from "./pages/LoginPage/LoginPage"
import { BrowserRouter, Route, Switch } from "react-router-dom";

const data = [
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук ASUS"
  },
  {
    url: "https://is.gd/7ty7or",
    name: "Мышь компьютерная HuyPizda"
  },
  {
    url: "https://is.gd/j0kecm",
    name: "Наушники Xiaomi redmi airdots"
  },
  {
    url: "https://is.gd/mkEyDx",
    name: "Видеокарта MSI nVidia GeForce GTX 1650"
  }
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/pages/LoginPage/LoginPage"
            component={LoginPage}
          />
          <Route
            exact
            path="/pages/MainPage/MainPage"
            render={()=><MainPage data={data}/>}
            //data={data}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
