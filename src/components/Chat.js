import { Box, Input, Button, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import styled from 'styled-components'
import { getMessages, sendMessage } from '../services'
import { useImmer } from 'use-immer'

// as a prove here messagebox as styled components
const MessageBox = styled.p`
  background-color: ${props => props.own ? '#dcf8c6' : '#ffffff'};
  padding: 10px;
  position: relative;
  width: fit-content;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-left: ${props => props.own ? 'auto' : '0'};
  cursor: default;
`;

const MessageFrom = styled.span`
  position: absolute;
  top: -15px;
  font-weight: 800;
  font-size: xx-small;
`

const MessageTimestamp = styled.span`
  margin-left: 10px;
  font-size: xx-small;
`

const Chat = ({ conversation, socket }) => {
  const [message, setMessage] = useState('')
  const [messages, updateMessages] = useImmer([])

  useEffect(() => {
    if (!conversation) {
      return
    }

    getMessages(conversation.id)
      .then(result => updateMessages(() => result.result))
  }, [conversation, updateMessages])

  useEffect(() => {
    if (!socket) { return }
    socket.on('message', message => {
      updateMessages(draft => [...draft, message])
    })
  }, [socket, updateMessages])

  return <Box flex='1'
    display='flex' flexDirection='column' marginInlineStart='0 !important'>
    <Box flex='1' bgGradient="linear(#f9fafc, blue.500)"
      padding='30px' overflowY='scroll' >
      {conversation && messages.map((message, i) => <MessageBox key={i}
        own={conversation.withUser.id !== message.senderId} >
        <MessageFrom>{message.from.username}</MessageFrom>{message.text}
        <MessageTimestamp>{new Date(message.createdAt).toUTCString()}</MessageTimestamp>
      </MessageBox>)}
    </Box>
    <Box>
      <form style={{ display: 'flex' }}>
        <Input placeholder="type message" value={message} onChange={e => setMessage(e.target.value)} />
        <Button type='submit' onClick={e => {
          e.preventDefault()

          if (!message) {
            return
          }

          sendMessage(conversation.id, message)
          // cleanup
          setMessage('')
        }} ><Heading size='sm' color='blue.500' >SEND</Heading></Button>
      </form>
    </Box>
  </Box >
}

export default Chat