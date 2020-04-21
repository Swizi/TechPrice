import React, { useContext } from "react";
import "./SearchTab.css";
import SearchContext from '../.././SearchContext';
import CloseIcon from '@material-ui/icons/Close';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 300
      }
    },
    margin: {
      margin: theme.spacing(1),
      width: 200
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  }));

export default function SearchTab(props) {
    const { isClicked, editSearchTab } = useContext(SearchContext);
    console.log("isClicked = ", isClicked);

    const classes = useStyles();

    return (
        <div className="search_block" style={{ display: isClicked ? "flex" : "none" }}>
            <CloseIcon className="exit_icon" onClick={() => editSearchTab(!isClicked)} />
            <form className={classes.root} autoComplete="on">
                <TextField
                    className="text_field"
                    id="standard-search"
                    type="search"
                    label="Поиск"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

            </form>
        </div>
    );
}
