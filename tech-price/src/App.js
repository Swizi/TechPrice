import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";

const data = [
  {
    id: 0,
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук ASUS",
    description: "Зашибенный ноут",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      }
    ]
  },
  {
    id: 1,
    url: "https://is.gd/7ty7or",
    name: "Мышь компьютерная AlohaGaming",
    description: "Зашибенная мышка",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      }
    ]
  },
  {
    id: 2,
    url: "https://is.gd/j0kecm",
    name: "Наушники Xiaomi redmi airdots",
    description: "Зашибенные наушники",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      },
      {
        id: 1,
        url: "https://is.gd/BQe4UR",
        name: "Denis Bosyi",
        review: "Выглядят стильно, но в ушах держатся довольно скверно.",
        isLiked: false
      },
      {
        id: 2,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      },
      {
        id: 3,
        url: "https://is.gd/BQe4UR",
        name: "Denis Bosyi",
        review: "Выглядят стильно, но в ушах держатся довольно скверно.",
        isLiked: false
      }
    ]
  },
  {
    id: 3,
    url: "https://is.gd/mkEyDx",
    name: "Видеокарта MSI nVidia GeForce GTX 1650",
    description: "Зашибенная видюха",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      }
    ]
  }
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/LoginPage" component={LoginPage} />
          <Route
            exact
            path="/"
            render={() => <MainPage data={data} />}
            //data={data}
          />
          <Route exact path="/RegistrationPage" component={RegistrationPage} />
          <Route
            exact
            path="/ProductPage/:id"
            render={() => <ProductPage data={data} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
