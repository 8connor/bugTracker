import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./index.css";

function About() {
    return (
        <Container>
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <Card
                        className="shadow"
                        style={{ height: "50vh", marginTop: "50px", marginBottom: "50vh" }}
                    >
                        <Card.Body
                            className="text-center mt-5 aboutCard"
                        >
                            <Card.Text>
                                <p>
                                    bugTracker is an application that aims to simplify the process of bug ticket management.
                                </p>
                                <p>
                                    This application is currently still under development, but the basic functionality is currently in tact.
                                </p>
                                <p>
                                    This application uses React.js, Node.js, MongoDb, Express, and Bootstrap.
                                </p>
                                <p>
                                    Test login 
                                    username: <span className="text-danger">renewi3847@combcub.com </span> 
                                    password: <span className="text-danger">admin123!</span>
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default About;