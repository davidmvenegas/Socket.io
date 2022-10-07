import { useEffect } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

function App() {
  const sendMessage = () => {
    socket.emit("send_message", {message: 'hello'})
  }

  useEffect(() => {
    socket.on("recive_message", (data) => {
      alert(data.message)
    })
  }, [socket])
  

  return (
    <div className="app">
      <input type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
