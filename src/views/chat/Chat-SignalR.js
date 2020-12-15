import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
import APIManager from 'src/utils/LinkAPI'
import { useSelector } from 'react-redux';
export default () => {
  const [userName, setUserName] = useState("");
  // const [message, setMessage] = useState("");
  const [userNameOnline, setUserNameOnline] = useState([]);
  const [connection, setConnection] = useState();
   const  userNameCurrent  = useSelector((state) => state.AuthReducer.userName);
  
  useEffect( () => {
    const createHubConnection = async () => {
      const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(APIManager+ "/chatHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
      debugger
     await socketConnection.start();
    setConnection(socketConnection);

 
    if (userNameCurrent) {
      setUserName(userNameCurrent);
    }
    socketConnection &&socketConnection.on("online", userOnline =>   
  {
      setUserNameOnline(userOnline);
  });
    socketConnection &&  socketConnection.invoke("online", userNameCurrent);
    //offline
    return () => {
      alert(123)
      socketConnection &&socketConnection.on("offline", userOnline =>   
      {
          setUserNameOnline(userOnline);
      });
      socketConnection &&  socketConnection.invoke("offline", userNameCurrent);
    }
  
    }
    createHubConnection();
   
    
  }, []);
  
  connection &&connection.on("online", userOnline =>   
  {
      setUserNameOnline(userOnline);
  });

  
  return (
    <div className="wrapper">
      <div className="card border-primary">
        <h5 className="card-header bg-primary text-white">
          <i className="fas fa-comment"></i> Chat
        </h5>
        <div className="card-body overflow-auto">
          {userNameOnline.map((msg, index) => (
            <Message
              key={index}
              username={msg}
           
            />
          ))}
        </div>
        <div className="card-footer border-primary p-0">
          <div className="input-group">
            <button onClick={()=>{
                connection && connection.invoke("online", userName);
            }}>
              button
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
};
