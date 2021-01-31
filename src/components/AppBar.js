import { Search2Icon } from "@chakra-ui/icons"
import {
  Button, Flex, Heading, InputGroup, InputLeftElement,
  Input, Spacer, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react"
import { useState, useEffect, useCallback } from "react"
import { useAlert } from "react-alert"
import { searchUsers, createConversation } from '../services'

let timer = null

const AppBar = ({ setToken, setConversations }) => {
  const alert = useAlert()
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])

  const createConversationCallback = useCallback(
    (withId) => {
      createConversation(withId)
        .then(() => setConversations())
        .catch(e => alert.show(e, { type: 'error' }))
      setInputValue('')
      setResults([])
    },
    [alert, setConversations],
  )

  // this effects fot the rendering of results for the search bar
  useEffect(() => {
    if (searchQuery === '' || searchQuery === ' ' || searchQuery.split(' ').length > 3) {
      setResults([])
      return
    }

    searchUsers(searchQuery)
      .then(result => setResults(result.result))
      .catch(e => { })

  }, [searchQuery])

  useEffect(() => { // this is my wonderfull idea ;)
    clearTimeout(timer)
    timer = setTimeout(() => setSearchQuery(inputValue), 500)
  }, [inputValue])

  return <Flex padding='2' alignItems='center' boxShadow='md' w='inherit' maxW='80em' minH='3.5em'>
    <InputGroup w='16em' marginLeft='3'>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input variant='filled' placeholder="find user" value={inputValue}
        onChange={e => setInputValue(e.target.value)} />
    </InputGroup>
    <Menu isOpen={results.length > 0} >
      <MenuButton></MenuButton>
      <MenuList >
        {results.map((user, i) => <MenuItem onClick={() => createConversationCallback(user.id)}
          key={i}>{user.username}</MenuItem>)}
      </MenuList>
    </Menu>
    <Spacer flex='0.5' />
    <Heading size='md' color='blue.500' display={{ base: 'none', md: 'initial' }} >Super Chat</Heading>
    <Spacer />
    <Button marginInline='3' colorScheme="gray"
      variant="link" onClick={() => setToken(null)}>logout</Button>
  </Flex>
}

export default AppBar