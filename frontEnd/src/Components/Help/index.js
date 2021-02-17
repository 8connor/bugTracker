import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./index.css";

function Help() {
    return (
        <Container>
            <Row className="justify-content-center">
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
                                    For assistance please contact me via github, linkedIn, or email.
                                </p>
                                <a href="https://github.com/8connor">github</a>
                                <br />
                                <a href="https://www.linkedin.com/in/james-hooven/">linkedIn</a>
                                <br />
                                <a href="mailto:connorh16@gmail.com">email</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Help;