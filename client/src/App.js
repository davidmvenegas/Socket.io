import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

function App() {
  const inputRef = useRef()
  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    socket.emit("send_message", { message: inputRef.current.value})
    inputRef.current.value = ""
  }

  useEffect(() => {
    const trigger = (data) => {
      setMessages(messages => [...messages, data.message])
    }
    socket.on("recive_message", trigger)
    return () => {
      socket.off("recive_message", trigger);
    }
  }, [socket])

  return (
    <div className="app">
      <div className="input-box">
        <input type="text" placeholder="Message..." ref={inputRef} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div className="message-box">
        <h1>Messages:</h1>
        <ul>
          {messages.map(message => (
            <li key={Math.random()}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
