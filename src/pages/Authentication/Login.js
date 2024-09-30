import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, Alert } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logo from '../../assets/images/logo-light.png';

const Login = (props) => {
    document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Mark form as submitted when submitting
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            // Log the response for debugging
            console.log('Response:', response);
            console.log('Data:', data);
    
            if (response.ok) {
                // Navigate to the dashboard if login is successful
                setMessage('Login successful');
                setMessage(data.message || 'Login successful');
                setIsError(false);
                navigate('/')
            } else {
                // Display error message
                setMessage(data.message || 'No records available. Try again.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again later.');
            setIsError(true);
        }
    };
    

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logo} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back!</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>

                                        {/* Only show message if form is submitted */}
                                        {formSubmitted && message && (
                                            <Alert color={isError ? "danger" : "success"}>
                                                {message}
                                            </Alert>
                                        )}

                                        <div className="p-2 mt-4">
                                            <Form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <Label htmlFor="username" className="form-label">Username</Label>
                                                    <Input
                                                        type="text"
                                                        id="username"
                                                        name="user_name"
                                                        placeholder="Enter Username"
                                                        className="form-control"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            type="password"
                                                            id="password-input"
                                                            name="password_key"
                                                            placeholder="Enter Password"
                                                            className="form-control pe-5"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <Button color="primary" className="btn w-100" type="submit">Login</Button>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account? <Link to='/register'>SignUp</Link></p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
