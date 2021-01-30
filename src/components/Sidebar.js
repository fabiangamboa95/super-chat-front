import { Heading, Text, Box, Center } from "@chakra-ui/react"

const users = ['sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',
  'sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',
  'sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',
  'sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',
  'sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',
  'sofia', 'ruben', 'carloasdasdaskjhaksjfhdds',]

// const users = ['sofia', 'ruben', 'carloasdasdaskjhaksjfhdds']

const Sidebar = () => {
  return <Box flex='0.35' overflowY='scroll' maxW='10em' >
    {users.map((element, i) =>
      <Center cursor='pointer' padding='15px' display='flex' flexDirection='column'
        backgroundColor={element === 'sofia' ? 'blue.500' : ''} key={i}
        borderBottom='1px' borderColor='gray.300' >
        <Heading size='sm' >{element}</Heading>
        <Text fontSize='13px'>offline</Text>
      </Center>)}
  </Box>

}

export default Sidebar