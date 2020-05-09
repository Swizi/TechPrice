import React, { useContext } from "react";
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
  const cookies = new Cookies();

  $.post("", {target: "checking"}, function(data){
    var response = $.parseJSON(data);
    if (response.error == "false"){
      setRedirect(true);
    }
  })

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let history = useHistory();

  if (redirect){
    return (
      <Redirect to="" />
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
        <span className="default_black_text">denis.bosiiy@gmail.com</span>
        <span className="default_gray_text">Текущий пароль</span>
        <span className="default_black_text password_text">шолупонь</span>

        <span className="default_gray_text">ФИО</span>
        <span className="default_black_text">Босый Денис Владиславович</span>
        <FormControlLabel className="checkbox_label"
          control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Отправлять выгодные предложения из желаемых"
        />
        {/* <span>checkbox на рассылку желаемых товаров</span> */}
      </div>
    </div>
  );
}

