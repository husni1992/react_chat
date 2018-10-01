const io = require("socket.io-client");

export default () => {
  const socket = io.connect("http://localhost:8500");
  // const socket = io.connect("https://murmuring-cove-55442.herokuapp.com/");

  function subscribeToMessages(onMessageReceived) {
    socket.on("message", onMessageReceived);
  }

  function emitMessage(chatroomName, msg, cb) {
    socket.emit("message", { chatroomName, message: msg }, cb);
  }

  const subscribeToDeleteMessage = onMessageDelete => {
    socket.on("delete_message", onMessageDelete);
  };

  function deleteMessage(messageId) {
    socket.emit("delete_message", { messageId });
  }

  return {
    emitMessage,
    deleteMessage,
    subscribeToDeleteMessage,
    subscribeToMessages
  };
};
