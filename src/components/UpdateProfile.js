import React , {useRef, useState} from 'react'
import { Form ,Button, Card, Alert, } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContexts"
// import { Link } from 'react-router-dom';


const UpdateProfile = () => {
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();

  

 function handleSubmit(e){
  e.preventDefault()
  if(passwordRef.current.value !== passwordConfirmRef.current.value){
    return setError("password does not match")
  }

  const promises = []
  setLoading(true)
  setError("")
  setMessage("")
  if(emailRef.current.value !== currentUser.email){
     promises.push(updateEmail(emailRef.current.value))
  }
  if(passwordRef.current.value){
     promises.push(updatePassword(passwordRef.current.value))
  }

  Promise.all(promises)
  .then(() => {
    history.push("/")
  }).catch(() => {
   setError("failed to update account")
  }).finally(() => {
    setLoading(false)
  })
}

    return (
       <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Your Profile</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {message && <Alert variant="danger">{message}</Alert>} 
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef}  defaultValue={currentUser.email}/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
              </Form.Group>
              <Form.Group id="confPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
              </Form.Group>
              <Button disabled={loading} className="w-20 mx-auto d-block" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
    </>
    )}

export default UpdateProfile;