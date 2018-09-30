const io = require("socket.io-client");

export default function() {
  const socket = io.connect("http://localhost:8500");

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
