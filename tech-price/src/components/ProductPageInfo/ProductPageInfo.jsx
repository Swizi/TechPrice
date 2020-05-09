import React, { useState }  from "react";
import "./ProductPageInfo.css";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "nuka-carousel";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import $ from 'jquery';

export default function ProductPageInfo(props) {
    const [isClicked, changeStyle] = useState(false);

    const [auth, setAuth] = React.useState(false);

    $.post("http://localhost/ajax/check_auth.php", {target: "checking"}, function(data){
      var response = $.parseJSON(data);
      if (response.error == "false"){
        setAuth(true);
      }
    })
    return (
        <div className="product_description">
            <div className="product_description_header_block">
                <h1 className="product_page_header">{props.data.name}</h1>
                <div className="favourite_button" onClick={() => changeStyle(!isClicked)}>
                { isClicked ? <FavoriteIcon className="favorite_icon" style={{display: auth ? "flex" : "none"}}/> : <FavoriteBorderIcon className="favorite_icon" style={{display: auth ? "flex" : "none"}}/> }
                </div>
            </div>
            <Carousel
                slidesToShow={1}
                cellSpacing={10}
                dragging={true}
                pauseOnHover={true}
                className="product_images_carousel"
            >
                {props.data.urls.map(function (item, index) {
                    return (
                        <img
                            key={index}
                            className="product_page_image"
                            src={item}
                            alt={props.data.name}
                        />
                    );
                })}
            </Carousel>
        </div>
    );
}
