import React, { Component } from "react";
import "./Chatlist.styles.css";
import icon from "./rubbish-bin.svg";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class ChatList extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = item => {
    this.setState({ modalIsOpen: true, item });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  deleteMessage = () => {
    this.setState({ modalIsOpen: false });
    this.props.handleDeleteMessage(this.state.item);
  };

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h4 ref={subtitle => (this.subtitle = subtitle)}>Delete this message?</h4>
        <button className="deletePopupBtn cancelBtn" onClick={this.closeModal}>
          Close
        </button>
        <button className="deletePopupBtn deleteBtn" onClick={this.deleteMessage}>
          Delete
        </button>
      </Modal>
    );
  };

  render() {
    return this.props.messageList.map((item, index) => {
      const isCurrentUser = item.sender === this.props.currentUser;
      return (
        <div className={isCurrentUser ? "ownMessageBox" : "otherMessageBox"} key={index}>
          <span>{item.text}</span>
          <span style={{ marginLeft: 20, fontSize: 10, color: isCurrentUser ? "grey" : "white" }}>
            {item.timeStamp}
          </span>
          <span
            style={{
              float: "right"
            }}
          >
            <img
              onClick={() => {
                this.openModal(item);
              }}
              style={{ height: 20, width: 20 }}
              src={icon}
            />
          </span>

          {this.renderModal()}
        </div>
      );
    });
  }
}

export default ChatList;
