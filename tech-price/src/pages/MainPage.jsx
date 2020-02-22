import React from 'react';
// import CustomButton from '../components/Button';
import LoginButton from '../components/LoginButton/LoginButton';
import ProductCard from '../components/ProductCard/ProductCard'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import './MainPage.css'


export function Page(props) {
    // const headerTextStyle = {
    //   color: "red"
    // }

    return (
<div className="page-flexbox">
    <div className="flex-button">
        {/* <CustomButton />  */}
        < LoginButton />
    </div>
    <div className = "flex-box">
        <span className = "header-text"> TechPrice </span> 
        <span className = "city-text"> Йошкар - Ола </span>
    </div> 
    <TextField 
    className = "text-field"
    label="Искать товары" 
    variant="outlined"  
    InputProps={{
        // className: 'text-field',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}/>
    <p style={{textAlign: "center",
                 fontFamily: "Roboto",
                 fontStyle: "normal",
                 fontWeight: "normal",
                 fontSize: "17px",
                 lineHeight: "20px"}}>Наиболее просматриваемые товары:
    </p>
    <div className="product-cards">
        {
        props.data.map(function (item, index){
            return (
                <ProductCard key={index} data={item}/>
            )
        })
    } 
    </div>
</div>
    );
}