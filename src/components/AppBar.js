import { Search2Icon } from "@chakra-ui/icons"
import {
  Box, Flex, Heading, InputGroup, InputLeftElement,
  Input,
  Spacer
} from "@chakra-ui/react"

const AppBar = () => {
  return <Flex padding='2' alignItems='center' boxShadow='sm' >
    <InputGroup w='20em' marginLeft='3'>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input variant='filled' placeholder="find user" />
    </InputGroup>
    <Spacer flex='0.5' />
    <Heading size='md' color='blue.500' display={{ base: 'none', md: 'initial' }} >Super Chat</Heading>
    <Spacer />
    <Box marginInline='3' color="gray.500">logout</Box>
  </Flex>
}

export default AppBar