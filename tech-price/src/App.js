import React, { useState } from "react";
import "./App.css";
import { Link, useHistory, useLocation } from "react-router-dom";
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

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { isVariableDeclarator } from "@babel/types";
import UserContext from './UserContext';

import Cookies from 'universal-cookie';

// import { UserProvider } from './UserContext'
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

const LoadingPage = () => <div>Loading...</div>;

// const MainPage = React.lazy(() => import("./pages/MainPage/MainPage"));
// const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
// const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage/RegistrationPage"));
// const ProductPage = React.lazy(() => import("./pages/ProductPage/ProductPage"));
// const UserCityPage = React.lazy(() => import("./pages/UserCityPage/UserCityPage"));
// const SalesPage = React.lazy(() => import("./pages/SalesPage/SalesPage"));
// const RedirectPage = React.lazy(() => import("./pages/RedirectPage/RedirectPage"));

const useStyles = makeStyles({
  list: {
    width: 200
  }
});

// var userCity = "Москва";

const pageHeader = "2";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const faq = [
  {
    question: "Часто ли вы занимаетесь распитием спиртосодержащих напитков?",
    answer:
      "Мы не любим пить пиво. Предпочитаем соли, спайсы. Очень обрадовались, что подросткам стали продавать снюс. Правда мы не знали как его использовать и просто жевали как жевачку."
  },
  {
    question: "К какой ОПГ вы относитесь?",
    answer: "К самой отмороженной"
  }
];

const help_data = [
  {
    block_id: 0,
    name: "Обратная связь",
    url: "https://is.gd/Xg7LQf",
    id: "feedback"
  },

  {
    block_id: 0,
    name: "Частые вопросы",
    url: "https://is.gd/pzm3TA",
    id: "faq"
  }
];

const sorting_text = [
  "По популярности",
  "По цене по возрастанию",
  "По цене по убыванию"
];

const city_list = [
  {
    city: "Москва",
    latitude: 55.7522,
    longitude: 37.6156
  },
  {
    city: "Ханты-Мансийск",
    latitude: 61.0042,
    longitude: 69.0019
  },
  {
    city: "Санкт-Петербург",
    latitude: 59.9386,
    longitude: 30.3141
  },
  {
    city: "Йошкар-Ола",
    latitude: 56.6388,
    longitude: 47.8908
  },
  {
    city: "Кировоград",
    latitude: 48.5132,
    longitude: 32.2597
  },
  {
    city: "Днепр",
    latitude: 48.4593,
    longitude: 35.0387
  },
  {
    city: "Евпатория",
    latitude: 45.2009,
    longitude: 33.3666
  },
  {
    city: "Севастополь",
    latitude: 44.5888,
    longitude: 33.5224
  }
];

const data = [
  {
    id: 0,
    urls: ["https://is.gd/zwDw5r", "https://is.gd/lfHeuN"],
    popularity: 4,
    name: "Ноутбук ASUS",
    description: "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую.",
        isLiked: true
      }
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 14599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 1,
        name: "DNS",
        price: 14799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 2,
        name: "Citilink",
        price: 14999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/"
      }
    ]
  },
  {
    id: 1,
    urls: ["https://is.gd/7ty7or", "https://is.gd/lfHeuN"],
    popularity: 5,
    name: "Мышь компьютерная AlohaGaming",
    description: "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      }
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 4599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 1,
        name: "DNS",
        price: 4799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 2,
        name: "Citilink",
        price: 4999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/"
      }
    ]
  },
  {
    id: 2,
    urls: ["https://is.gd/j0kecm", "https://is.gd/lfHeuN"],
    popularity: 3,
    name: "Наушники Xiaomi redmi airdots",
    description: "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
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
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 300,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 1,
        name: "DNS",
        price: 400,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 2,
        name: "Citilink",
        price: 500,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/"
      }
    ]
  },
  {
    id: 3,
    urls: ["https://is.gd/mkEyDx", "https://is.gd/lfHeuN"],
    popularity: 1,
    name: "Видеокарта MSI nVidia GeForce GTX 1650",
    description: "Производитель ; Xiaomi ; Страна ; Китай ; Диапазон частот ; 2.4 ГГц ",
    reviews: [
      {
        id: 0,
        url: "https://is.gd/8AzG0h",
        name: "Egor Komaroff",
        review: "Всё понравилось, рекомендую",
        isLiked: true
      }
    ],
    shops: [
      {
        id: 0,
        name: "TehVolt",
        price: 104599,
        rating: 4.7,
        reviews: 150,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 1,
        name: "DNS",
        price: 104799,
        rating: 4.5,
        reviews: 79,
        link: "https://www.dns-shop.ru/"
      },
      {
        id: 2,
        name: "Citilink",
        price: 104999,
        rating: 4.1,
        reviews: 45,
        link: "https://www.dns-shop.ru/"
      }
    ]
  }
];

const catalog = [
  {
    id: 0,
    name: "Бытовая техника",
    url: "https://is.gd/3ZM9lY",
    items: [
      {
        block_id: 1,
        id: 0,
        name: "Крупная бытовая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 1,
        name: "Техника для дома",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 2,
        name: "Техника для кухни",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 3,
        name: "Техника для красоты и здоровья",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 4,
        name: "Встраиваемая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 5,
        name: "Климатическая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      }
    ]
  },
  {
    id: 1,
    name: "Ноутбуки и аксессуары",
    url: "https://is.gd/7KJAEw",
    items: [
      {
        block_id: 1,
        id: 0,
        name: "Крупная бытовая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 1,
        name: "Техника для дома",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 2,
        name: "Техника для кухни",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 3,
        name: "Техника для красоты и здоровья",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 4,
        name: "Встраиваемая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 5,
        name: "Климатическая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      }
    ]
  },
  {
    id: 2,
    name: "Телефоны",
    url: "https://is.gd/Tdmnc1",
    items: [
      {
        block_id: 1,
        id: 0,
        name: "Крупная бытовая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 1,
        name: "Техника для дома",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 2,
        name: "Техника для кухни",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 3,
        name: "Техника для красоты и здоровья",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 4,
        name: "Встраиваемая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 5,
        name: "Климатическая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      }
    ]
  },
  {
    id: 3,
    name: "Периферийные устройства",
    url: "https://is.gd/OEquVx",
    items: [
      {
        block_id: 1,
        id: 0,
        name: "Крупная бытовая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 1,
        name: "Техника для дома",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 2,
        name: "Техника для кухни",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 3,
        name: "Техника для красоты и здоровья",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 4,
        name: "Встраиваемая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      },
      {
        block_id: 1,
        id: 5,
        name: "Климатическая техника",
        items: data,
        url: "https://is.gd/6EvpgB"
      }
    ]
  }
];

// const Drawer = createDrawerNavigator();

function App() {
  const cookies = new Cookies();


  navigator.geolocation.getCurrentPosition(

    // Функция обратного вызова при успешном извлечении локации
    function (position) {

      var min_city = "";

      console.log("Широта ", position.coords.latitude);
      console.log("Долгота ", position.coords.longitude);

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

      cookies.set("Location_city", min_city, { path: '/' });

      console.log(cookies.get("Location_city"));

      setCity(cookies.get("Location_city"));

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
  const value = { userCity, setCity };


  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          "Домашняя страница",
          "Войти [Профиль]",
          "Акции",
          "Служба поддержки"
        ].map((text, index) => (
          <Link
            key={index}
            to={`${(index === 0 && "/") ||
              (index === 1 && "/LoginPage") ||
              (index === 2 && "/SalesPage") ||
              (index === 3 && "/HelpPage")}`}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <AccountBoxIcon />}
                {index === 2 && <MonetizationOnIcon />}
                {index === 3 && <ContactSupportIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="list_text" />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Выйти", `Город: ${userCity}`].map((text, index) => (
          <Link key={index} to={`${index === 1 && "/UserCityPage"}`}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <ExitToAppIcon />}
                {index === 1 && <LocationCityIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="list_text" />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={state.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {sideList("left")}
        </SwipeableDrawer>
        <UserContext.Provider value={value}>
          <Switch>
            <Route path="/LoginPage" header="Вход" component={LoginPage} />
            <Route
              exact
              path="/"
              render={() => (
                <MainPage
                  catalog={catalog}
                  toggleDrawer={toggleDrawer}
                  data={data}
                  classes={classes}
                  toggleDrawer={toggleDrawer}
                />
              )}
            />
            <Route
              exact
              path="/RegistrationPage"
              header="Регистрация"
              component={RegistrationPage}
            />
            <Route
              exact
              header="Товар"
              path="/ProductPage/:id"
              render={() => <ProductPage data={data} />}
            />
            <Route
              exact
              header="Выбор города"
              path="/UserCityPage"
              render={() => (
                <UserContext.Provider value={value}>
                  <UserCityPage data={data} cities={city_list} />
                </UserContext.Provider>
              )}
            />
            <Route
              exact
              header="Акции"
              path="/SalesPage"
              render={() => <SalesPage data={data} />}
            />
            <Route
              exact
              path="/RedirectPage/:id"
              render={() => <RedirectPage catalog={catalog} />}
            />
            <Route
              exact
              path="/ShopPage/:id/:id"
              render={() => <ShopPage catalog={catalog} sorting_text={sorting_text} />}
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
              component={FeedbackPage}
            />
            <Route
              render={() => (
                <h1 style={{ textAlign: "center", marginTop: 300 }}>
                  404: page not found
                </h1>
              )}
            />
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
