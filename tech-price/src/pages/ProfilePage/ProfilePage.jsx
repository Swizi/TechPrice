import React, { useContext, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./ProfilePage.css";
import CityCard from "../../components/CityCard/CityCard";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import UserContext from '../../UserContext';

import { Redirect } from "react-router-dom";

import Cookies from 'universal-cookie';
import $ from 'jquery';

import CircularProgress from '@material-ui/core/CircularProgress';
// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: 300
//     }
//   },
//   margin: {
//     margin: theme.spacing(1),
//     width: 200
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1)
//   }
// }));

export function ProfilePage(props) {

  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(
    {
      aname: '',
      email: '',
      fname: '',
      lname: '',
      login: '',
      mailing: false
    }
  )
  const cookies = new Cookies();

  useEffect(() => {
    console.log("Ajax request");
    $.post(`${props.host}/ajax/user.php`, { target: "user-info" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status == 0) {
        setRedirect(false);
        console.log(response);
        setUser({
          aname: response.aname,
          email: response.email,
          fname: response.fname,
          lname: response.lname,
          login: response.login,
        });
        if (response.mailing == 'f') {
          setState({checkedA: false});
        } else {
          setState({checkedA: true});
        }
      } else {
        setRedirect(true);
      }
      setLoading(false);
    });
  }, []);


  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // Здесь запрос на сервак на изменение mailing
  };

  let history = useHistory();

  if (redirect) {
    return <Redirect to="/" />
  }

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">TechPrice</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  return (
    <div className="page_flexbox">
      <div className="navigation_menu">
        <div className="default_menu_wrapper">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <span className="menu_header_text">Личные данные</span>
        </div>
      </div>
      <div className="profile_block">
        <span className="default_gray_text">Электроная почта</span>
        <span className="default_black_text">{user.email}</span>
        <span className="default_gray_text">Логин</span>
        <span className="default_black_text password_text">{user.login}</span>

        <span className="default_gray_text">ФИО</span>
        <span className="default_black_text">{user.lname} {user.fname} {user.aname}</span>
        <FormControlLabel className="checkbox_label"
          control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Отправлять выгодные предложения из желаемых"
        />
        {/* <span>checkbox на рассылку желаемых товаров</span> */}
      </div>
    </div>
  );
}

