import { useEffect } from 'react';
import './App.css';
import openSocket from 'socket.io-client'

function App() {

  useEffect(() => {
    const socket = openSocket('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYxMTc3NDI5NSwiZXhwIjoxNjEyMzc5MDk1fQ.KXowULryeD-rOes8bHfNH7zqgWY0s8f-Tdas2P8Um3M'
      }
    })
    socket.on('message', (message) => console.log(message))
  }, [])

  return (
    <div className="app">
      what a cool library!
    </div>
  );
}

export default App;
