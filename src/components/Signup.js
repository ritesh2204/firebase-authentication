import React , {useRef, useState} from 'react'
import { Form ,Button, Card, Alert, } from 'react-bootstrap';
import {useAuth} from "../contexts/AuthContexts"
// import { Link } from 'react-router-dom';


const Signup = () => {
const {signUp} = useAuth()
const [error, setError] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)
const emailRef = useRef();
const passwordRef = useRef();
const passwordConfirmRef = useRef();

async function handleSubmit(e){
  e.preventDefault()
  if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('password doesnot match') 
  }

  try {
    setError('')
    setLoading(true)
    await signUp(emailRef.current.value, passwordRef.current.value)
    setMessage('Signup Succesfully ')
  }catch {
        setError('failed to create an account')
  }
setLoading(false)

}

    return (
       <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-20 mx-auto d-block" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? Log In
        </div>
    </>
    )
}

export default Signup;