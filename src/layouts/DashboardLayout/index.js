import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './ChatSocket';
import TopBar from './TopBar';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
import APIManager from 'src/utils/LinkAPI'
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [connection, setConnection] = useState();
  const [userName, setUserName] = useState("");

  const [userNameOnline, setUserNameOnline] = useState([]);
  const userNameCurrent = useSelector((state) => state.AuthReducer.userName);
  useEffect( () => {
   
    async function InitChatHub() {
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
    }
    
    InitChatHub();
    
  }, []);
  connection && connection.on("online", userOnline => {
  
    setUserNameOnline(userOnline);
  });
  connection && connection.on("offline", userOnline => {
    
    setUserNameOnline(userOnline);
  });
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true) }
              connection = {connection}
              userNameCurrent= {userNameCurrent}
       />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        userNameOnline = {userNameOnline}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
