import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import anime from "animejs/lib/anime.js";
import Axios from "axios";

function OpenTickets() {

    useEffect(() => {
        anime({
            targets: ".projCard",
            scale: [0, 1],
            easing: 'easeInOutExpo',
            duration: 400,
        });
    }, []);


    return (
        <Card>
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Open tickets
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                <Container>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card >
    )
}

export default OpenTickets;