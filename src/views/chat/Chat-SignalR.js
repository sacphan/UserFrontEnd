import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../../App.css';
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

  return (
    <div className="messenger"
      style={
        { color: 'black' }} >
      <div className="message-header" > CHAT BOX </div>
      <hr style={{ marginTop: '30px' }} />

      <div className="message-body"
        id="message-body" >
      </div>

      <Form onSubmit={sendMessage}
        autoComplete="off" >
        <InputGroup className="mb-3 message-input"
          style={
            { padding: '0px', margin: '0px' }} >
          <FormControl style={
            { padding: '0px' }}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name="messageText" />
          <InputGroup.Append >
            <Button variant="success"
              type="submit" >
              Send </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};
