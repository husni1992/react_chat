import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketClient from "./socket-client/socket-client";
import Const from "./lib/Constants";
import Utils from "./lib/Utils";
import ChatList from "./components/ChatList/ChatList";

const socket = socketClient();

class App extends Component {
  state = {
    chatInput: "",
    userRegistered: false,
    userName: "",
    messageList: []
  };

  componentDidMount() {
    socket.registerHandler(message => {
      console.log(message);
      this.setState({
        messageList: [...this.state.messageList, message.message]
      });
    });
    const existingUser = Utils.getFromLocalStorage(Const.USER_NAME);
    if (existingUser) {
      this.setState({
        userRegistered: true,
        userName: existingUser
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.userRegistered === false && nextState.userRegistered === true)
      setTimeout(() => {
        this.nameInput.focus();
      }, 0);
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();

      const messageBody = {
        id: new Date().getTime(),
        sender: this.state.userName,
        text: event.target.value,
        timeStamp: new Date()
      };

      socket.message('abcd', messageBody, function() {
        console.log("Message sent");
      });

      this.setState({
        chatInput: "",
        messageList: [...this.state.messageList, messageBody]
      });
    }
  };

  onTextInput = event => {
    this.setState({
      chatInput: event.target.value
    });
  };

  onUsernameTextInput = event => {
    this.setState({
      userName: event.target.value
    });
  };

  onUsernameRegister = event => {
    if (event.key == "Enter" && event.target.value) {
      this.setState({
        userRegistered: true,
        userName: event.target.value
      });
      Utils.setLocalStorage(Const.USER_NAME, event.target.value);
    }
  };

  render() {
    if (!this.state.userRegistered) {
      return (
        <div>
          <p>Enter Username</p>
          <input
            type="text"
            onChange={this.onUsernameTextInput}
            onKeyPress={this.onUsernameRegister}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">{this.state.userName}, welcome to fast chat!</h1>
        </div>

        <div className="chatContainer">
          <ChatList currentUser={this.state.userName} messageList={this.state.messageList} />
        </div>

        <div className="chatmsgwrapper">
          <textarea
            ref={input => {
              this.nameInput = input;
            }}
            onKeyPress={this.handleKeyPress}
            className="chatmsg disabled"
            onChange={this.onTextInput}
            value={this.state.chatInput}
            cols="80"
            rows="1"
            disabled=""
          />
        </div>
      </div>
    );
  }
}

export default App;
