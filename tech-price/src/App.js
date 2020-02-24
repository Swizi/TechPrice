import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

const data = [
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук ASUS"
  },
  {
    url: "https://is.gd/7ty7or",
    name: "Мышь компьютерная AlohaGaming"
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
          <Route path="/LoginPage" component={LoginPage} />
          <Route exact
            path="/"
            render={() => <MainPage data={data} />}
            //data={data}
          />
          <Route path="/RegistrationPage" component={RegistrationPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
