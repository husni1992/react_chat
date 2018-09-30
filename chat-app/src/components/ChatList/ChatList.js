import React, { Component } from "react";
import "./Chatlist.styles.css";

function ChatList(props) {
  return props.messageList.map((item, index) => {
    const isCurrentUser = item.sender === props.currentUser;
    return (
      <div className={isCurrentUser ? "ownMessageBox" : "otherMessageBox"} key={index}>
        <span>{item.text}</span>
        <span style={{ marginLeft: 20, fontSize: 10, color: isCurrentUser ? "grey" : "white" }}>
          {item.timeStamp}
        </span>
      </div>
    );
  });
}

export default ChatList;
