import React from 'react';
import Image from 'react-bootstrap/Image';
import FormControl from 'react-bootstrap/FormControl';
import Message from './Message'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './Chat.css';
const ChatBox = () => {
  return (
    <div className="messenger " style={{ color: 'black' }}>
      <div className="message-header">CHAT BOX</div>


      <div className="message-body" id="message-body">
        <Message

        /></div>

      <Form >
        <input></input>
      </Form>
    </div>
  )
}

export default ChatBox;