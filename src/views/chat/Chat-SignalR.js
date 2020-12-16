import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import './Chat.css'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
import APIManager from 'src/utils/LinkAPI'
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
export default () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  // const [message, setMessage] = useState("");
  const [userNameOnline, setUserNameOnline] = useState([]);
  const [connection, setConnection] = useState();
  const userNameCurrent = useSelector((state) => state.AuthReducer.userName);
  const sendMessage = e => {
    alert("send")
}
  useEffect(async () => {

    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(APIManager + "/chatHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    await socketConnection.start();
    setConnection(socketConnection);


    if (userNameCurrent) {
      setUserName(userNameCurrent);
    }

    socketConnection && socketConnection.invoke("online", userNameCurrent);

    socketConnection.onclose(function () {
      alert('Server has disconnected');
    });
    return () => {
      alert(123)
      connection && connection.invoke("offline", userNameCurrent);
    }


  }, []);

  connection && connection.on("online", userOnline => {
    setUserNameOnline(userOnline);
  });
  connection && connection.on("offline", userOnline => {
    setUserNameOnline(userOnline);
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="friendOnline">
       {list('right')}
    </div>
  //   <Drawer  anchor={'right'} open={true} >
  //  
  // </Drawer>
    );
};
