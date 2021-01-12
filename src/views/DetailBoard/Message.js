import React from 'react';
import Image from 'react-bootstrap/Image';

const Message = props => {
  const { isOwn, content, avatar } = props;

  return (
    <div
      style={
        isOwn === false
          ? { textAlign: '-webkit-left', marginBottom: '10px', display: '-webkit-box' }
          : { textAlign: '-webkit-right', marginBottom: '10px', display: '-webkit-box' }
      }
    >
      <Image style={{ marginRight: '4px' }} width="34px" height="34px" src={"https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"} roundedCircle />

      <div
        className="message-text"
        style={isOwn ? {} : { background: 'linear-gradient(#02aab0, #00cdac)' }}
      >
        abbcbcbc
        abbcbcbc
        abbcbcbc
        abbcbcbc
        abbcbcbc
        abbcbcbc
        abbcbcbc 
      </div>
    </div>
  );
};

export default Message;