const socket = new WebSocket(
  "wss://9f1b-136-24-109-242.ngrok-free.app/1Rj0mqn5s78Xunpq/ws"
);

let gameLogic = {
  popLoon: (loonId) => {
    publish("popLoon", { loonId });
  },
};

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection established");
  subscribe("msg");
  subscribe("loonState");
});
function handleTopic(topic, data) {
  switch (topic) {
    case "msg":
      console.log("Event Message:", data);
      // Handle event message
      break;
    case "loonState":
      console.log("Loon State:", data);
      // Handle loon state
      break;
    // Add more cases for other topics if needed
  }
}

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.msg) {
    console.log("Event Message:", message.msg);
  }
  if (message.loonState) {
    console.log("Loon State:", message.loonState);
  }
  const topic = Object.keys(message)[0];
  const data = message[topic];
  handleTopic(topic, data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket connection closed");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});

function subscribe(topic) {
  const request = {
    subscribe: topic,
  };
  socket.send(JSON.stringify(request));
}

function publish(topic, payload) {
  const request = {
    publish: {
      [topic]: payload,
    },
  };
  socket.send(JSON.stringify(request));
}

gameLogic.popLoon(1);
