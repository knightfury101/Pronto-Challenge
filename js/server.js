// js/server.js

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let subscriptions = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const request = JSON.parse(message);

    if (request.subscribe) {
      const topic = request.subscribe;
      subscriptions[topic] = ws;
      sendInitialData(topic, ws); // Send initial data when a client subscribes
    } else if (request.publish) {
      const topic = Object.keys(request.publish)[0];
      if (subscriptions[topic]) {
        subscriptions[topic].send(JSON.stringify(request.publish[topic]));
      }
    }
  });
});

function sendInitialData(topic, ws) {
  // Customize this function to send initial data for each topic
  switch (topic) {
    case "msg":
      // Send initial event message data
      ws.send(
        JSON.stringify({
          [topic]: "Welcome to the game!",
        })
      );
      break;
    case "loonState":
      // Send initial loon state data
      ws.send(
        JSON.stringify({
          [topic]: { loon1: "state1", loon2: "state2" }, // Replace with actual data
        })
      );
      break;
    // Add more cases for other topics if needed
  }
}
