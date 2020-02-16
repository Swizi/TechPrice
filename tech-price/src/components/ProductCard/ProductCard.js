import React from 'react';
import './ProductCard.css'

export default function CustomButton(props) {
    return (
      <div className="card-block">
        <img className="image-style" src={props.data.url}/>
        <span className="product-name">{props.data.name}</span>
      </div>
    );
  }