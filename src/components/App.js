import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContexts";
import Signup from "./Signup";
import {BrowserRouter as Router, Switch,Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Forgotpassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";


 
const App = () => {
  return(
  <Container className="d-flex justify-content-center align-items-center"
  style={{minHeight: "100vh"}}
  >
    <div className="w-100" style={{maxWidth: "400px"}}>
    
    <Router>
       <AuthProvider>
      <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/forgot-password" component={Forgotpassword}/>   
      </Switch>
    </AuthProvider>
    </Router>    
    </div>
    </Container>
)};

export default App;

