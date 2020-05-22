import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import HelpIcon from "@material-ui/icons/Help";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function FAQCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary={props.data.question} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse className="sub_list" in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary={props.data.answer} />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}
