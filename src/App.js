import { Box, VStack } from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import openSocket from 'socket.io-client'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import useToken from './auth/useToken';
import LoginRegister from './components/LoginRegister';
import { getConversations } from './services'
import { useAlert } from 'react-alert'

function App() {
  const alert = useAlert()
  const { token, setToken } = useToken()
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(0)
  const [socket, setSocket] = useState()

  const setConversationsCallback = useCallback(() => {
    getConversations()
      .then(result => setConversations(result.result))
      .catch(e => alert.show(e, { type: 'error' }))
  },
    [alert],
  )

  useEffect(() => {
    if (!token) {
      return
    }

    setConversationsCallback()

    const sockt = openSocket('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        'x-auth-token': token
      }
    })
    setSocket(sockt)

    // cleanup    
    return () => { // executed on component will unmount!
      sockt.close() // working as intended so ;)
    }
  }, [token, setConversationsCallback])

  if (!token) {
    return <LoginRegister setToken={setToken} />
  }

  return (
    <Box display='grid' placeItems='center' h='100vh' backgroundColor='#dadbd3' >
      <VStack backgroundColor='#ededed' h='90vh' w='90vw' boxShadow='base' maxW='80em' >
        <AppBar setToken={setToken} setConversations={setConversationsCallback} />
        <Box display='flex' w='100%' marginTop='0px !important' flexGrow='1' overflow='hidden' >
          <Sidebar
            conversations={conversations}
            currentConversation={currentConversation}
            setCurrentConversation={setCurrentConversation} />
          <Chat conversation={conversations[currentConversation]} socket={socket} />
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
