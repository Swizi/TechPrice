import React, { useState, useEffect } from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { UserCityPage } from "./pages/UserCityPage/UserCityPage";
import { SalesPage } from "./pages/SalesPage/SalesPage";
import { ShopPage } from "./pages/ShopPage/ShopPage";
import { RedirectPage } from "./pages/RedirectPage/RedirectPage";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import { FAQPage } from "./pages/FAQPage/FAQPage";
import { FeedbackPage } from "./pages/FeedbackPage/FeedbackPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";

import UserContext from "./UserContext";
import SearchContext from "./SearchContext";
import CatalogContext from "./CatalogContext";
import ItemContext from "./ItemContext";

import Cookies from "universal-cookie";

import $ from "jquery";

import CircularProgress from "@material-ui/core/CircularProgress";

const host = "http://localhost";

const faq = [
  {
    question: "Часто ли вы занимаетесь распитием спиртосодержащих напитков?",
    answer:
      "Мы не любим пить пиво. Предпочитаем соли, спайсы. Очень обрадовались, что подросткам стали продавать снюс. Правда мы не знали, как его использовать, и просто жевали как жевачку.",
  },
  {
    question: "К какой ОПГ вы относитесь?",
    answer: "К самой отмороженной",
  },
];

const help_data = [
  {
    block_id: 0,
    name: "Обратная связь",
    url: "https://is.gd/Xg7LQf",
    id: "feedback",
  },

  {
    block_id: 0,
    name: "Частые вопросы",
    url: "https://is.gd/pzm3TA",
    id: "faq",
  },
];

const sorting_text = [
  "По популярности",
  "По цене по возрастанию",
  "По цене по убыванию",
];

var city_list = [
  {
    city: "Москва",
    latitude: 55.7522,
    longitude: 37.6156,
  },
  {
    city: "Ханты-Мансийск",
    latitude: 61.0042,
    longitude: 69.0019,
  },
  {
    city: "Санкт-Петербург",
    latitude: 59.9386,
    longitude: 30.3141,
  },
  {
    city: "Йошкар-Ола",
    latitude: 56.6388,
    longitude: 47.8908,
  },
  {
    city: "Кировоград",
    latitude: 48.5132,
    longitude: 32.2597,
  },
  {
    city: "Днепр",
    latitude: 48.4593,
    longitude: 35.0387,
  },
  {
    city: "Евпатория",
    latitude: 45.2009,
    longitude: 33.3666,
  },
  {
    city: "Севастополь",
    latitude: 44.5888,
    longitude: 33.5224,
  },
];

const items_data = [
  {
    id: 0,
    urls: ["https://is.gd/zwDw5r", "https://is.gd/lfHeuN"],
    popularity: 4,
    name: "Ноутбук ASUS",
    description:
      "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую.",
        isLiked: true,
      },
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 14599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 1,
        name: "DNS",
        price: 14799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 2,
        name: "Citilink",
        price: 14999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/",
      },
    ],
  },
  {
    id: 1,
    urls: ["https://is.gd/7ty7or", "https://is.gd/lfHeuN"],
    popularity: 5,
    name: "Мышь компьютерная AlohaGaming",
    description:
      "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true,
      },
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 4599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 1,
        name: "DNS",
        price: 4799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 2,
        name: "Citilink",
        price: 4999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/",
      },
    ],
  },
  {
    id: 2,
    urls: ["https://is.gd/j0kecm", "https://is.gd/lfHeuN"],
    popularity: 3,
    name: "Наушники Xiaomi redmi airdots",
    description:
      "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true,
      },
      {
        id: 1,
        url: "https://is.gd/BQe4UR",
        name: "Denis Bosyi",
        review: "Выглядят стильно, но в ушах держатся довольно скверно.",
        isLiked: false,
      },
      {
        id: 2,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true,
      },
      {
        id: 3,
        url: "https://is.gd/BQe4UR",
        name: "Denis Bosyi",
        review: "Выглядят стильно, но в ушах держатся довольно скверно.",
        isLiked: false,
      },
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 300,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 1,
        name: "DNS",
        price: 400,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 2,
        name: "Citilink",
        price: 500,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/",
      },
    ],
  },
  {
    id: 3,
    urls: ["https://is.gd/mkEyDx", "https://is.gd/lfHeuN"],
    popularity: 1,
    name: "Видеокарта MSI nVidia GeForce GTX 1650",
    description:
      "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true,
      },
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 104599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 1,
        name: "DNS",
        price: 104799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/",
      },
      {
        id: 2,
        name: "Citilink",
        price: 104999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/",
      },
    ],
  },
];

var catalog = [
  // {
  //   id: 0,
  //   name: "Бытовая техника",
  //   url: "https://is.gd/3ZM9lY",
  //   items: [
  //     {
  //       block_id: 1,
  //       id: 0,
  //       name: "Крупная бытовая техника",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //     {
  //       block_id: 1,
  //       id: 1,
  //       name: "Техника для дома",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //     {
  //       block_id: 1,
  //       id: 2,
  //       name: "Техника для кухни",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //     {
  //       block_id: 1,
  //       id: 3,
  //       name: "Техника для красоты и здоровья",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //     {
  //       block_id: 1,
  //       id: 4,
  //       name: "Встраиваемая техника",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //     {
  //       block_id: 1,
  //       id: 5,
  //       name: "Климатическая техника",
  //       items: data,
  //       url: "https://is.gd/6EvpgB",
  //     },
  //   ],
  // },
  // {
];
var isSet = false;

function App() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $.post(`${host}/ajax/get_content.php`, { target: "get-categ" }, function (
      data
    ) {
      var response = $.parseJSON(data);
      console.log(response[0]);
      // response = JSON.parse(response);
      if (response.status === 0) {
        catalog = [];
        console.log(response);
        for (var key in response){
          console.log(key);
          var item = {
            id: response[key].id,
            name: response[key].title,
            url: response[key].picture
          }
          catalog.push(item);
        }
        console.log(catalog);
      } else {
        console.log(response);
      }
      setLoading(false);
    });
  }, []);

  navigator.geolocation.getCurrentPosition(
    // Функция обратного вызова при успешном извлечении локации
    function (position) {
      var min_city = "";

      var min_difference = 400;

      var value = "";

      var location_value = position.coords.latitude + position.coords.longitude;

      for (var i = 0; i < city_list.length; i++) {
        value = city_list[i].latitude + city_list[i].longitude;
        if (Math.abs(location_value - value) < min_difference) {
          min_difference = Math.abs(location_value - value);
          min_city = city_list[i].city;
        }
      }

      cookies.set("Location_city", min_city, { path: "/" });

      if (!isSet) {
        setCity(cookies.get("Location_city"));
        isSet = true;
      }

      /*
      В объекте position изложена подробная информация
      о позиции устройства:
 
      position = {
          coords: {
              latitude - Широта.
              longitude - Долгота.
              altitude - Высота в метрах над уровнем моря.
              accuracy - Погрешность в метрах.
              altitudeAccuracy - Погрешность высоты над уровнем моря в метрах.
              heading - Направление устройства по отношению к северу.
              speed - Скорость в метрах в секунду.
          }
          timestamp - Время извлечения информации.
      }
      */
    },

    // Функция обратного вызова при неуспешном извлечении локации
    function (error) {
      /*
      При неудаче, будет доступен объект error:
 
      error = {
          code - Тип ошибки
                  1 - PERMISSION_DENIED
                  2 - POSITION_UNAVAILABLE
                  3 - TIMEOUT
 
          message - Детальная информация.
      }
      */
      console.log(error.code);
      console.log(error.message);
    }
  );
  const [userCity, setCity] = useState("Москва");
  const user_value = { userCity, setCity };

  const [isClicked, editSearchTab] = useState(false);
  const search_value = { isClicked, editSearchTab };

  const [searchCatalog, editSearchCatalog] = useState({
    header: '',
    array: []
  });
  const catalog_search_value = { searchCatalog, editSearchCatalog };

  const [item, setItem] = useState({});
  const item_value = { item, setItem };

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            host={host}
            path="/LoginPage"
            header="Вход"
            render={() => <LoginPage host={host} />}
          />{" "}
          <Route
            exact
            path="/"
            render={() => (
                <CatalogContext.Provider value={catalog_search_value}>
                  <SearchContext.Provider value={search_value}>
                    <UserContext.Provider value={user_value}>
                      <MainPage
                        catalog={catalog}
                        host={host}
                      />{" "}
                    </UserContext.Provider>{" "}
                  </SearchContext.Provider>
                </CatalogContext.Provider>
            )}
          />{" "}
          <Route
            exact
            path="/RegistrationPage"
            header="Регистрация"
            render={() => <RegistrationPage host={host} />}
          />{" "}
          <Route
            exact
            header="Товар"
            path="/ProductPage/:id"
            render={() => <ProductPage data={items_data} host={host} />}
          />
          <Route
            exact
            header="Товар"
            path="/ProductPage"
            render={() => (
              <ItemContext.Provider value={item_value}>
                <ProductPage data={items_data} host={host} />
              </ItemContext.Provider>
            )}
          />
          <Route
            exact
            header="Выбор города"
            path="/UserCityPage"
            render={() => (
              <UserContext.Provider value={user_value}>
                <UserCityPage data={items_data} cities={city_list} />{" "}
              </UserContext.Provider>
            )}
          />{" "}
          <Route
            exact
            header="Акции"
            path="/SalesPage"
            render={() => <SalesPage data={items_data} />}
          />
          <Route
            exact
            header="Список желаемого"
            path="/FavoritesPage"
            render={() => <FavoritesPage data={items_data} host={host} />}
          />
          <Route
            exact
            path="/RedirectPage/:id"
            render={() => (
                <CatalogContext.Provider value={catalog_search_value}>
                  <RedirectPage catalog={catalog} host={host} />
                </CatalogContext.Provider>
            )}
          />
          <Route
            exact
            path="/ShopPage/:id"
            render={() => (
              <ShopPage
                catalog={catalog}
                sorting_text={sorting_text}
                host={host}
              />
            )}
          />
          <Route
            exact
            path="/ShopPage"
            render={() => (
              <ItemContext.Provider value={item_value}>
                <CatalogContext.Provider value={catalog_search_value}>
                  <ShopPage
                    catalog={catalog}
                    sorting_text={sorting_text}
                    host={host}
                  />
                </CatalogContext.Provider>
              </ItemContext.Provider>
            )}
          />
          <Route
            exact
            path="/HelpPage"
            render={() => <HelpPage help_data={help_data} />}
          />
          <Route
            exact
            path="/HelpPage/faq"
            render={() => <FAQPage faq={faq} />}
          />
          <Route
            exact
            path="/HelpPage/feedback"
            render={() => <FeedbackPage host={host} />}
          />{" "}
          <Route
            exact
            path="/ProfilePage"
            render={() => <ProfilePage host={host} />}
          />{" "}
        </Switch>{" "}
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
