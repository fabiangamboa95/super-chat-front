import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider as AlertProvider } from 'react-alert'
import { AlertTemplate, options } from './components/AlertTemplate'

// theming stuff *************************************************
const colors = {
  brand: { // add custom colors
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const theme = extendTheme({ colors })

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...options} >
        <App />
      </AlertProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)