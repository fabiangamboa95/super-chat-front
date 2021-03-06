import { AddIcon, UnlockIcon } from "@chakra-ui/icons"
import {
  Box, FormControl, Input, FormLabel, Button, Center, Divider, Heading, VStack,
  Wrap, WrapItem, FormErrorMessage, useBreakpointValue,
} from "@chakra-ui/react"
import { Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { signIn, signUp } from '../auth/authService'
import { useAlert } from "react-alert"

// this integration chakra-useField hook, my creation ;)
const MyInput = ({ label, isRequired, ...props }) => { // custom imput, less code
  const [field, meta] = useField(props)
  return <FormControl isInvalid={meta.touched && meta.error} isRequired={isRequired} marginTop='10px'>
    <FormLabel htmlFor={props.id || props.name} >{label}</FormLabel>
    <Input {...field} {...props} backgroundColor='#ffffff' />
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
}

const SigninForm = ({ setToken }) => {
  const alert = useAlert()

  return <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less') // form: validation, error message
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required')
    })}
    onSubmit={(values, { setSubmitting }) => {
      signIn(values)
        .then(result => setToken(result))
        .catch(e => alert.show(e, { type: 'error' }))
        .finally(() => setSubmitting(false))
    }}
  >
    {props => <Form>
      <MyInput
        label='Username'
        name='username'
        type='text'
        placeholder='type username'
        isRequired
      />
      <MyInput
        label='Password'
        name='password'
        type='password'
        placeholder='type password'
        isRequired
      />
      <Button mt={4}
        colorScheme="blue"
        isLoading={props.isSubmitting}
        type="submit" >Login</Button>
    </Form>}
  </Formik>
}

const SignupForm = ({ setToken }) => {
  const alert = useAlert()

  return <Formik
    initialValues={{ username: '', password: '', passwordConfirmation: '' }}
    validationSchema={Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less') // form: validation, error message
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required'),
      passwordConfirmation: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })}
    onSubmit={(values, { setSubmitting }) => {
      signUp(values)
        .then(result => setToken(result))
        .catch(e => alert.show(e, { type: 'error' }))
        .finally(() => setSubmitting(false))
    }}
  >
    {props => <Form>
      <MyInput
        label='Username'
        name='username'
        type='text'
        placeholder='type username'
        isRequired
      />
      <MyInput
        label='Password'
        name='password'
        type='password'
        placeholder='type password'
        isRequired
      />
      <MyInput
        label='Password Confirmation'
        name='passwordConfirmation'
        type='password'
        placeholder='type password again'
        isRequired
      />
      <Button mt={4}
        colorScheme="teal"
        isLoading={props.isSubmitting}
        type="submit" >Register</Button>
    </Form>}
  </Formik>
}

const LoginRegister = ({ setToken }) => {
  // very nice ui hook, (set property value for diffrent breakpoints)
  const dividerDisplay = useBreakpointValue({ base: 'none', lg: 'block' })
  const wrapHeight = useBreakpointValue({ base: 'inherit', lg: '' })

  return <Center h='100vh' >
    <Wrap spacing='5em' justify='center' height={wrapHeight} >
      <WrapItem >
        <VStack>
          <Box bg='gray.100' display='flex' px='2.8em' py='2em' borderTopRadius='5px'>
            <Heading size='md' margin='5px'>SignIN to Super Chat</Heading>
            <UnlockIcon boxSize='4em' color='gray.500' marginLeft='2.8em' />
          </Box>
          <Box bg='gray.200' px='5em' py='2em'
            borderBottomRadius='5px' marginTop='0 !important' >
            <SigninForm setToken={setToken} />
          </Box>
        </VStack>
      </WrapItem>

      <WrapItem display={dividerDisplay} ><Divider orientation="vertical" /></WrapItem>

      <WrapItem>
        <VStack >
          <Box bg='gray.100' display='flex' px='2.5em' py='2em' borderTopRadius='5px' >
            <Heading size='md' margin='5px'>SignUP to Super Chat</Heading>
            <AddIcon boxSize='4em' color='gray.500' marginLeft='2.9em' />
          </Box>
          <Box bg='gray.200' px='5em' py='2em'
            borderBottomRadius='5px' marginTop='0 !important' >
            <SignupForm setToken={setToken} />
          </Box>
        </VStack>
      </WrapItem>
    </Wrap>
  </Center>
}

export default LoginRegister