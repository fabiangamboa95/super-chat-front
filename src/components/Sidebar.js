import { Container, Divider, List, ListItem, Heading, Text } from "@chakra-ui/react"

const Sidebar = () => {
  return <List boxShadow='sm' height='100%'>
    <ListItem>
      {['sofia', 'ruben', 'carlos'].map(element => <>
        <Container paddingY='5' paddingX='10'
          backgroundColor={element === 'sofia' ? 'blue.500' : ''}>
          <Heading size='sm' >{element}</Heading>
          <Text fontSize='13px'>offline</Text>
        </Container>
        <Divider />
      </>)}
    </ListItem>
  </List>
}

export default Sidebar