import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import { makeStyles } from '@material-ui/core/styles';

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
    var token = JSON.parse(localStorage.getItem("Token")).token;
    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(APIManager + "/chatHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => token
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
      connection && connection.invoke("offline", userNameCurrent);
    }
  }, []);

  connection && connection.on("online", userOnline => {
    setUserNameOnline(userOnline);
  });
  connection && connection.on("offline", userOnline => {
    setUserNameOnline(userOnline);
  });

  return (
<div></div>
    );
};
