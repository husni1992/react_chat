const io = require("socket.io-client");

export default function() {
  // const socket = io.connect("http://localhost:8500");
  const socket = io.connect("https://murmuring-cove-55442.herokuapp.com/");

  function subscribeToMessages(onMessageReceived) {
    socket.on("message", onMessageReceived);
  }

  function emitMessage(chatroomName, msg, cb) {
    socket.emit("message", { chatroomName, message: msg }, cb);
  }

  return {
    emitMessage,
    subscribeToMessages
  };
}
