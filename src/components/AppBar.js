import { Search2Icon } from "@chakra-ui/icons"
import {
  Button, Flex, Heading, InputGroup, InputLeftElement,
  Input,
  Spacer
} from "@chakra-ui/react"

const AppBar = ({ setToken }) => {
  return <Flex padding='2' alignItems='center' boxShadow='md' w='inherit' maxW='80em' minH='3.5em'>
    <InputGroup w='16em' marginLeft='3'>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input variant='filled' placeholder="find user" />
    </InputGroup>
    <Spacer flex='0.5' />
    <Heading size='md' color='blue.500' display={{ base: 'none', md: 'initial' }} >Super Chat</Heading>
    <Spacer />
    <Button marginInline='3' colorScheme="gray"
      variant="link" onClick={() => setToken(null)}>logout</Button>
  </Flex>
}

export default AppBar