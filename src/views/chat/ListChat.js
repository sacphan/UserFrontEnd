import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InforFriend from 'src/views/chat/ShowInfoFriend';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListChat({userNameOnline}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
 console.log(userNameOnline)
  const handleClick = () => {
    setOpen(!open);
  };
  var listComponentOnline=[];
  userNameOnline.map((item)=>{
  listComponentOnline.push(
  <InforFriend key={item} name={item}></InforFriend>
       )}
)

  return (
    <List   
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Danh sách bạn bè online
        </ListSubheader>      
      }    
      className={classes.root}
    >
    {listComponentOnline}         
    </List>
 
  );
}
