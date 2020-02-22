import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage";

const data = [
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук ASUS"
  },
  {
    url: "https://is.gd/7ty7or",
    name: "Мышь компьютерная EgorGamesCorporation"
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
    <div className="App">
      <MainPage data={data} />
    </div>
  );
}

export default App;
