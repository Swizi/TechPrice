import React from "react";
import "./ProductPageInfo.css";
import Divider from "@material-ui/core/Divider";
import Carousel from "nuka-carousel";

export default function ProductPageInfo(props) {
    return (
        <div className="product_description">
            <h1 className="product_page_header">{props.data.name}</h1>
            <Divider />
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
