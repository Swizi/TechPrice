import React from "react";
import "./App.css";
import { Page } from "./pages/Page";

const data = [
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук ASUS"
  },
  {
    url: "https://is.gd/W8hs6p",
    name: "Мышь компьютерная EgorGamesCorporation"
  },
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук MSI"
  },
  {
    url: "https://is.gd/zwDw5r",
    name: "Ноутбук MSI"
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
