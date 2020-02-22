import React from "react";
import "./App.css";
import { Page } from "./pages/Page";

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
      <Page data={data} />
    </div>
  );
}

export default App;
