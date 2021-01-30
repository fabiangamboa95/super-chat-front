import { Box, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import openSocket from 'socket.io-client'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import useToken from './auth/useToken';
import LoginRegister from './components/LoginRegister';

function App() {
  const { token, setToken } = useToken()

  useEffect(() => {
    if (!token) {
      return
    }

    const socket = openSocket('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        'x-auth-token': token
      }
    })

    socket.on('message', (message) => console.log(message))

    // cleanup    
    return () => { // executed on component will unmount!
      socket.close() // working as intended so ;)
    }
  }, [token])

  // console.log(token)
  if (!token) {
    return <LoginRegister setToken={setToken} />
  }

  return (
    <Box display='grid' placeItems='center' h='100vh' backgroundColor='#dadbd3' >
      <VStack backgroundColor='#ededed' h='90vh' w='90vw' boxShadow='base' maxW='80em' >
        <AppBar />
        <Box display='flex' w='100%' marginTop='0px !important' flexGrow='1' overflow='hidden' >
          <Sidebar />
          <Chat />
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
