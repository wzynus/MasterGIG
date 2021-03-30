
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';


import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import {login} from "../utils/axios_restfulAPI";



class Signin extends React.Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      designation: false,//user,true if admin
      loading: false,
      username: "",
      id: 0,
    };
  this.onChange = this.onChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)
  }

  

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({
      loading: true
    });
    const user = {
      email:this.state.email,
      password:this.state.password
    }
    login(user).then(res =>{
      console.log(res)
      this.setState({
        id : res.data.id,
        username: res.data.username,
        designation: res.data.admin_status
      });
      if(!res.error && this.state.loading){
        if (this.state.designation === false){
          this.props.history.push("/");
          window.location.reload();
        }
        else{
          this.props.history.push("/adminHomePage");
          window.location.reload();
        }  
      }
    });
  }



  


  render() {
    
    return(
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to MasterGiG</h3>
                </div>
                <Form className="mt-4"  onSubmit={this.onSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text value={this.state.email} onChange={this.onChange}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
    );
  }
}

export default Signin;
