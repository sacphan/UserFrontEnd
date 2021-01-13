import React, { PureComponent } from 'react';

import Message from './Message'
import Form from 'react-bootstrap/Form';

import './Chat.css';
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { MessageText } from "./messageText";
import { array } from 'prop-types';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export function MessageBox(props){
  
    const {game,IdUserCurrent,connection,turn} = props;
    const [text,setText]=React.useState('');
    const [message,setMessage] = React.useState([{userId:0,message1:''}]);
    console.log(game)
    const handleChange=(event)=>{
    
        setText(event.target.value)
    }
    const sendMessage = ()=>{
      debugger
      const sendmsg = {userId:IdUserCurrent,GameId:game.id,message1:text,Turn:turn};
     
      connection && connection.invoke("message", sendmsg);
      setMessage([...message,sendmsg]);
      setText('');

    }
    connection && connection.on("message"+turn, msg => {
      setMessage([...message,msg]);
      
    });
  
    let listChat =[];
    for (let index = 1; index < message.length; index++) {
      const element = message[index];
      debugger
      if (message[index+1])
      {
        
        if (message[index+1].userId==message[index].userId)
        
        listChat.push(<MessageText key = {message.message1}
          position="top"
          isRight={IdUserCurrent==element.userId}
          data={element.message1}
          endMessage={false}
        />)
        else
        {
            listChat.push(<MessageText key = {message.message1}
              position="bottom"
              isRight={IdUserCurrent==element.userId}
              data={element.message1}
              endMessage={true}
              src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
            />);
        }
      }
      else
      {
        
        listChat.push(<MessageText key = {message.message1}
          position="bottom"
          isRight={IdUserCurrent==element.userId}
          data={element.message1}
          endMessage={true}
          src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
        />);
      }
      
    }
    const sendEnter=(event)=>{
      debugger
      if(event.charCode == 13){
        sendMessage();
    }
    }
    return (
      <div className="wrap-message-box">
        <div className="header">
         
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
            />
          </StyledBadge>
          <span className="guest-infor">
            <span className="name">{IdUserCurrent==game.userId1 ? `${game.userId2Navigation?.username??""}` : `${game.userId1Navigation.username}`}</span>
            <span className="state">Đang hoạt động</span>
          </span>
        </div>
        {/* <div className="divider"></div> */}
        <div id="style-1" className="content">
        
         {listChat}
        </div>
        <div className="form-input">
          <input placeholder="Aa" className="input-text " value={text} onChange={handleChange} onKeyPress={sendEnter}></input>
          <span
            style={{
              padding: 5,
              display: "flex",
              alignItems: "center",
              color: "#0084FF",
              cursor: "pointer",
            }}
          >
            <SendIcon  onClick={sendMessage} />
          </span>
        </div>
      </div>
    );
  
}