// my alerts template
import { transitions, positions } from 'react-alert'
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
// my nice chakra integration
export const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    <Alert status={options.type} >
      <AlertIcon />
      <AlertTitle mr={2}>{options.type}!</AlertTitle>
      <AlertDescription>{JSON.stringify(message)}</AlertDescription>
      <CloseButton position="relative" right="-6px" top="0px" onClick={close} />
    </Alert>
  </div>
)

// alerts optional configuration
export const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

// the hook has a nice api;