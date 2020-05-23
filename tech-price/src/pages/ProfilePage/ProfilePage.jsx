import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "./ProfilePage.css";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Redirect } from "react-router-dom";

import $ from 'jquery';

import CircularProgress from '@material-ui/core/CircularProgress';

export function ProfilePage(props) {

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    {
      aname: '',
      email: '',
      fname: '',
      lname: '',
      login: '',
      mailing: false
    }
  )

  useEffect(() => {
    $.post(`${props.host}/ajax/user.php`, { target: "user-info" }, function (data) {
      var response = $.parseJSON(data);
      if (response.status === 0) {
        setRedirect(false);
        setUser({
          aname: response.aname,
          email: response.email,
          fname: response.fname,
          lname: response.lname,
          login: response.login,
        });
        if (response.mailing === 'f') {
          setState({checkedA: false});
        } else {
          setState({checkedA: true});
        }
      } else {
        setRedirect(true);
      }
      setLoading(false);
    });
  }, [props.host]);


  const [state, setState] = useState({
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
      </div>
    </div>
  );
}

