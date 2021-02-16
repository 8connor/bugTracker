import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


function Help(){
    return(
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <p>
                        For assistance please contact me via github, linkedIn, or email
                    </p>

                </Col>
            </Row>
        </Container>
    )
}

export default Help;