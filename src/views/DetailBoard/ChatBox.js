import React, { PureComponent } from 'react';

import Message from './Message'
import Form from 'react-bootstrap/Form';

import './Chat.css';
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { MessageText } from "./messageText";

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

export class MessageBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrap-message-box">
        <div className="header">
          {/* <h2>Chat Box</h2> */}
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
            <span className="name">James Rodriguez</span>
            <span className="state">Đang hoạt động</span>
          </span>
        </div>
        {/* <div className="divider"></div> */}
        <div id="style-1" className="content">
          <MessageText
            position="top"
            isRight={false}
            data="Loi nao do"
            endMessage={false}
          />
          <MessageText
            position="mid"
            isRight={false}
            data="M chụp t coi thử"
            endMessage={false}
          />
          <MessageText
            position="bottom"
            isRight={false}
            data="No chua co api nen phan show data chua co thui"
            endMessage={true}
            src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
          />

          <div className="time-space">Thứ 7, 03/10/2020</div>

          <MessageText
            position="top"
            isRight={true}
            data="doi ti,Chưa mua kiểu này bao h, de check xem dasd"
            endMessage={false}
          />
          <MessageText
            position="mid"
            isRight={true}
            data="ao h, de check xem dasd"
            endMessage={false}
          />
          <MessageText
            position="mid"
            isRight={true}
            data="doi ti,Ch h, de check xem dasd"
            endMessage={false}
          />
          <MessageText
            position="bottom"
            isRight={true}
            data="doi ti,Chưa mua kiểu này bao h, de check xem dasd"
            endMessage={false}
          />

          <div className="time-space">Thứ 7, 03/10/2020</div>

          <MessageText
            position="top"
            isRight={false}
            data="Loi nao do"
            endMessage={false}
          />
          <MessageText
            position="mid"
            isRight={false}
            data="M chụp t coi thử"
            endMessage={false}
          />
          <MessageText
            position="bottom"
            isRight={false}
            data="No chua co api nen phan show data chua co thui"
            endMessage={true}
            src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
          />
        </div>
        <div className="form-input">
          <input placeholder="Aa" className="input-text "></input>
          <span
            style={{
              padding: 5,
              display: "flex",
              alignItems: "center",
              color: "#0084FF",
              cursor: "pointer",
            }}
          >
            <SendIcon />
          </span>
        </div>
      </div>
    );
  }
}