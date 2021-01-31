import { Heading, Text, Box, Center } from "@chakra-ui/react"


const Sidebar = ({ conversations, currentConversation, setCurrentConversation }) => {
  return <Box flex='0.35' overflowY='scroll' maxW='10em' >
    {conversations.map((element, i) => <Center cursor='pointer' padding='15px' display='flex' flexDirection='column'
      backgroundColor={i === currentConversation ? 'blue.500' : ''} key={i}
      borderBottom='1px' borderColor='gray.300' onClick={() => { setCurrentConversation(i) }} >
      <Heading size='sm' >{element.withUser.username}</Heading>
      <Text fontSize='13px'>offline(NIE)</Text>
    </Center>
    )}
  </Box>

}

export default Sidebar