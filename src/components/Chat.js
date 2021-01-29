import { Box } from "@chakra-ui/react"
import styled from 'styled-components'

// as a prove here message as styled components
const MessageBox = styled.div`
  
`;

const Chat = () => {
  return <Box h='100%' w='100%' display='flex' flexDirection='column' marginInlineStart='0 !important'>
    <Box flex='1' backgroundColor='gray.200' >
      <MessageBox>some message</MessageBox>
    </Box>
    <Box>
      sfdg
    </Box>
  </Box>
}

export default Chat