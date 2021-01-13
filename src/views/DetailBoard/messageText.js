import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./messageText.css";

// interface props {
//   isRight: boolean;
//   position: string;
//   data: string;
//   endMessage: boolean;
//   src?: string;
// }

export class MessageText extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  render() {
    const { position, data, endMessage, src, isRight } = this.props;
    return (
      <div
        className={
          !isRight ? "wrap-item-message-left" : "wrap-item-message-right"
        }
      >
        <div style={{ width: 28, alignSelf: "flex-end", marginRight: 5 }}>
          {endMessage && !isRight && (
            <Avatar  style={{ width: "25px", height: "25px"}} src={src} />
          )}
        </div>
        <div
          className={
            !isRight
              ? `text-message position-${position}-left`
              : `text-message position-${position}-right`
          }
        >
          {data}
        </div>
      </div>
    );
  }
}