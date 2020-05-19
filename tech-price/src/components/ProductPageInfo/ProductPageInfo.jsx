import React, { useState, useEffect } from "react";
import "./ProductPageInfo.css";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "nuka-carousel";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import CircularProgress from '@material-ui/core/CircularProgress';

import $ from 'jquery';

export default function ProductPageInfo(props) {
    const [isClicked, changeStyle] = useState(false);

    const [auth, setAuth] = React.useState(false);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        $.post("http://localhost/ajax/check_auth.php", { target: "checking" }, function (data) {
            var response = $.parseJSON(data);
            if (response.status == 0) {
                setAuth(true);
            } else {
                setAuth(false);
            }
            setLoading(false);
        })
    }, []);
    return (
        <div className="product_description">
            <div className="product_description_header_block">
                <h1 className="product_page_header">{props.data.name}</h1>
                {loading ? <CircularProgress class="circular_progress" /> :
                <div className="favourite_button" onClick={() => changeStyle(!isClicked)}>
                    {isClicked ? <FavoriteIcon className="favorite_icon" style={{ display: auth ? "flex" : "none" }} /> : <FavoriteBorderIcon className="favorite_icon" style={{ display: auth ? "flex" : "none" }} />}
                </div>}
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
