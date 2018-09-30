import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketClient from "./socket-client/socket-client";
const socket = socketClient();

class App extends Component {
  state = {
    chatInput: ""
  };

  componentDidMount() {
    this.nameInput.focus();
    socket.registerHandler(message => {
      console.log(message);
    });
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fast Chat by Husny Ahamed</h1>
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
