import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function SortingBlock(props) {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const toDescendingPrice = () => {
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.sorting_text[0]} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse className="sub_list" in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary={props.sorting_text[0]} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary={props.sorting_text[1]} />
          </ListItem>
          <ListItem onClick={toDescendingPrice} button className={classes.nested}>
            <ListItemText primary={props.sorting_text[2]} />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}
