import React from 'react';
// import CustomButton from '../components/Button';
import CustomButton2 from '../components/Button2';
import ProductCard from '../components/ProductCard/ProductCard'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Page.css'


export function Page(props) {
    // const headerTextStyle = {
    //   color: "red"
    // }

    return (
<React.Fragment>
    <div className="flex-button">
        {/* <CustomButton />  */}
        <CustomButton2 />
    </div>
    <div className = "flex-box">
        <span className = "header-text"> TechPrice </span> 
        <span className = "city-text"> Йошкар - Ола </span>
    </div> 
    <TextField 
    label="Искать товары" 
    variant="outlined"  
    InputProps={{
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
    {/* {
        props.data.map((item, index)=>{
            return (
                <ProductCard key={index} data={item}/>
            )
        })
    } */}
    <div>
        <ProductCard data={props.data[0]} />
        <ProductCard data={props.data[1]} />
    </div>
    <div>
        <ProductCard data={props.data[2]} />
        <ProductCard data={props.data[3]} />
    </div>
        {/* {
        props.data.map(function (item, index){
            return (
                <ProductCard key={index} data={item}/>
            )
        })
    } */}
    </div>
</React.Fragment>
    );
}