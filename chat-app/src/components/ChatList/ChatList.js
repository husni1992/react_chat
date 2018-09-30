import React, { Component } from "react";
import "./Chatlist.styles.css";

function ChatList(props) {
  return props.messageList.map((item, index) => {
    if (item.sender !== null) {
      return (
        <div className="otherMessageBox" key={index}>
          {item.text}
        </div>
      );
    }
    return (
      <div className="ownMessageBox" key={index}>
        {item.text}
      </div>
    );
  });
}

export default ChatList;
