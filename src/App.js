import { Box, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import openSocket from 'socket.io-client'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

function App() {

  useEffect(() => {
    const socket = openSocket('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYxMTc3NDI5NSwiZXhwIjoxNjEyMzc5MDk1fQ.KXowULryeD-rOes8bHfNH7zqgWY0s8f-Tdas2P8Um3M'
      }
    })

    socket.on('message', (message) => console.log(message))

    // cleanup    
    return () => { // executed on component will unmount!
      socket.close() // working as intended so ;)
    }
  }, [])

  return (
    <Box display='flex' flexFlow='column' height='100vh'>
      <AppBar />
      <HStack display='flex' flex='1'>
        <Box height='100%' boxShadow='md' >
          <Sidebar />
        </Box>
        <Chat />
      </HStack>
    </Box>
  );
}

export default App;
