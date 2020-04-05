import React, { Suspense } from "react";
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

var userCity = "Йошкар-Ола";

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

const cities = [
  "Москва",
  "Ханты-Мансийск",
  "Санкт-Петербург",
  "Йошкар-Ола",
  "Кировоград",
  "Днепр",
  "Евпатория"
];

const data = [
  {
    id: 0,
    urls: ["https://is.gd/zwDw5r", "https://is.gd/lfHeuN"],
    name: "Ноутбук ASUS",
    description: "Зашибенный ноут. С другой стороны начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Равным образом консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
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
    name: "Мышь компьютерная AlohaGaming",
    description: "Зашибенная мышка. С другой стороны начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Равным образом консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
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
    id: 2,
    urls: ["https://is.gd/j0kecm", "https://is.gd/lfHeuN"],
    name: "Наушники Xiaomi redmi airdots",
    description: "Зашибенные наушники. С другой стороны начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Равным образом консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
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
    id: 3,
    urls: ["https://is.gd/mkEyDx", "https://is.gd/lfHeuN"],
    name: "Видеокарта MSI nVidia GeForce GTX 1650",
    description: "Зашибенная видюха. С другой стороны начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Равным образом консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
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
  // const history = useHistory();
  // const location = useLocation();
  // const history = useHistory();
  // const location = history.location;
  // var location_history = [];
  // location_history.push(location.pathname);
  // const unlisten = history.listen((location, action) => {
  //   // location is an object like window.location
  //   console.log("Location = ", action, location.pathname, location.state);
  // });

  // function goToPreviosPage() {
  //   console.log(history);
  //   console.log(location_history);
  //   console.log(location_history.pop());
  // }

  // console.log("Location - ", location);
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
        {/* <ListItem>
          <ListItemIcon button key={"Выйти"}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem> */}
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
  // var href = window.location.href;
  // href = href.split("/");
  // var path = "";
  // var len = href.length;
  // console.log(href);
  // console.log("Длина - ", len);
  // if (len == 4) {
  //   path = href[len - 1];
  // } else if (len == 5) {
  //   path = href[len - 2];
  // }
  // if (path == "") {
  //   path = "MainPage";
  // }
  // console.log("Путь - ", path);
  // var main_menu = {};
  // var default_menu = {};
  // if (
  //   path == "LoginPage" ||
  //   path == "RegistrationPage" ||
  //   path == "UserCityPage" ||
  //   path == "SalesPage" ||
  //   path == "Contacts"
  // ) {
  //   main_menu = {
  //     display: "none"
  //   };
  // }
  // if (path == "MainPage") {
  //   default_menu = {
  //     display: "none"
  //   };
  // }
  // var spareMenu = document.getElementById("main-menu");
  // console.log(spareMenu);
  // if (path == "LoginPage"){
  //   spareMenu.style.display = "none";
  // }
  return (
    <BrowserRouter>
      {/* <NavigationContainer>
        <Drawer.Navigator initialRouteName="MainPage">
          <Drawer.Screen name="MainPage" component={MainPage} />
          <Drawer.Screen name="LoginPage" component={LoginPage} />
        </Drawer.Navigator>
      </NavigationContainer> */}
      {/* <div className="navigation_menu">
        <div id="main-menu" style={main_menu} className="menu_wrapper">
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <span className="page_header">TechPrice</span>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            className="search_form"
          >
            <TextField id="standard-basic" label="Поиск" />
            <SearchIcon className="search_icon" />
          </form>
        </div>
        <div style={default_menu} className="default_menu_wrapper">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">
            {path === "LoginPage" && "Вход"}
            {path === "RegistrationPage" && "Регистрация"}
            {path === "ProductPage" && "Товар"}
            {path === "UserCityPage" && "Выбор города"}
            {path === "SalesPage" && "Акции"}
            {path == "Contacts" && "Служба поддержки"}
          </span>
        </div>
      </div> */}
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
                userCity={userCity}
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
              <UserCityPage data={data} cities={cities} userCity={userCity} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
