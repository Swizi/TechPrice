import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { UserCityPage } from "./pages/UserCityPage/UserCityPage";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { SalesPage } from "./pages/SalesPage/SalesPage"

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

const useStyles = makeStyles({
  list: {
    width: 200
  }
});

var city = "Йошкар-Ола";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const catalog = [
  {
    name: "Бытовая техника",
    url: "https://is.gd/3ZM9lY"
  },
  {
    name: "Ноутбуки и аксессуары",
    url: "https://is.gd/7KJAEw"
  },
  {
    name: "Телефоны",
    url: "https://is.gd/Tdmnc1"
  },
  {
    name: "Периферийные устройства",
    url: "https://is.gd/OEquVx"
  }
]

const data = [
  {
    id: 0,
    urls: ["https://is.gd/zwDw5r", "https://is.gd/pBN9Ss"],
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
    urls: ["https://is.gd/7ty7or", "https://is.gd/pBN9Ss"],
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
    urls: ["https://is.gd/j0kecm", "https://is.gd/pBN9Ss"],
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
    urls: ["https://is.gd/mkEyDx", "https://is.gd/pBN9Ss"],
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

// const Drawer = createDrawerNavigator();

function App() {
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
        {["Домашняя страница", "Войти", "Акции", "Служба поддержки"].map(
          (text, index) => (
            <Link
              key={index}
              to={`${(index === 0 && "/") ||
                (index === 1 && "/LoginPage") ||
                (index === 2 && "/SalesPage") ||
                (index === 3 && "/Contacts")}`}
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <AccountBoxIcon />}
                  {index === 2 && <MonetizationOnIcon />}
                  {index === 3 && <ContactSupportIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
      <List>
        {/* <ListItem>
          <ListItemIcon button key={"Выйти"}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem> */}
        {["Выйти", `Город: ${city}`].map((text, index) => (
          <Link key={index} to={`${index === 1 && "/UserCityPage"}`}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 && <ExitToAppIcon />}
                {index === 1 && <LocationCityIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <BrowserRouter>
      {/* <NavigationContainer>
        <Drawer.Navigator initialRouteName="MainPage">
          <Drawer.Screen name="MainPage" component={MainPage} />
          <Drawer.Screen name="LoginPage" component={LoginPage} />
        </Drawer.Navigator>
      </NavigationContainer> */}
      <div className="navigation-menu">
        <div className="menu-wrapper">
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <span className="page-header">TechPrice</span>
          <form className={classes.root} noValidate autoComplete="off" className="search-form">
            <TextField id="standard-basic" label="Поиск" />
            <SearchIcon className="search-icon" />
          </form>
        </div>
      </div>
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
          <Route path="/LoginPage" component={LoginPage} />
          <Route
            exact
            path="/"
            render={() => (
              <MainPage
                catalog={catalog}
                toggleDrawer={toggleDrawer}
                data={data}
                classes={classes}
              />
            )}
            //data={data}
          />
          <Route exact path="/RegistrationPage" component={RegistrationPage} />
          <Route
            exact
            path="/ProductPage/:id"
            render={() => <ProductPage data={data} />}
          />
          <Route
            exact
            path="/UserCityPage"
            render={() => <UserCityPage data={data} />}
          />
          <Route
            exact
            path="/SalesPage"
            render={() => <SalesPage data={data} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
