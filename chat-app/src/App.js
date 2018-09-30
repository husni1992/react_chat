import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketClient from "./socket-client/socket-client";
import Const from "./lib/Constants";
import Utils from "./lib/Utils";

const socket = socketClient();

class App extends Component {
  state = {
    chatInput: "",
    userRegistered: false,
    userName: ""
  };

  componentDidMount() {
    socket.registerHandler(message => {
      console.log(message);
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
    if (event.key == "Enter") {
      event.preventDefault();

      socket.message("TestChat", this.state.chatInput, function() {
        console.log("Message sent");
      });

      this.setState({
        chatInput: ""
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
        <header className="App-header">
          <h1 className="App-title">{this.state.userName}, welcome to fast chat!</h1>
        </header>

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
