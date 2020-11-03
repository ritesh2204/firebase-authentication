import React , {useRef, useState} from 'react'
import { Form ,Button, Card, Alert, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContexts"
// import { Link } from 'react-router-dom';

const Forgotpassword = () => {
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    

async function handleSubmit(e){
  e.preventDefault()
  try {
    setError('')
    setLoading(true)
    await resetPassword(emailRef.current.value)
    setMessage('Please check your e-mail')
  }catch {
        setError('failed to reseting the password')
  }
    setLoading(false)

}

    return (
       <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {message && <Alert variant="success">{message}</Alert>} 
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
         
              <Button disabled={loading} className="w-20 mx-auto d-block" type="submit">
                Send
              </Button>
            </Form>
         
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
           have an account? <Link to="/login">Login</Link>
        </div>
    </>
    )}

export default Forgotpassword;