import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import anime from "animejs/lib/anime.js";
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner';
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";
import OpenTicketsView from "./OpenTicketsView.js";

function OpenTickets() {
    const [tickets, setTickets] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [view, setView] = useState(false);

    useEffect(() => {
        Axios.get("/api/tickets")
            .then(response => {
                setEmpty(response.data.length === 0 ? true : false)
                setTickets(response.data)
            })
            .catch(err => console.log(err));

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
                {
                    view ?
                        <OpenTicketsView />
                        :
                        null
                }
                <Container>
                    <Row>
                        <Col
                            sm={{ span: 12, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            lg={{ span: 12, offset: 0 }}
                        >
                            <ListGroup variant="flush">
                                {tickets.length === 0 ?
                                    empty ? null
                                        : <Row className="justify-content-center">
                                            <Spinner animation="border" />
                                        </Row>
                                    : tickets.map((item, i) =>
                                        <>
                                            <ListGroup.Item key={i} id={i}>
                                                <Container>
                                                    <Row>
                                                        <Col
                                                            sm={{ span: 4, offset: 0 }}
                                                            md={{ span: 4, offset: 0 }}
                                                            lg={{ span: 4, offset: 0 }}
                                                        >
                                                            <p>Project: {item.project}</p>
                                                        </Col>
                                                        <Col
                                                            sm={{ span: 4, offset: 0 }}
                                                            md={{ span: 4, offset: 0 }}
                                                            lg={{ span: 4, offset: 0 }}
                                                        >
                                                            <p>severity:  {item.severity}</p>
                                                        </Col>
                                                        <Col
                                                            sm={{ span: 4, offset: 0 }}
                                                            md={{ span: 4, offset: 0 }}
                                                            lg={{ span: 4, offset: 0 }}
                                                        >
                                                            <Button onClick={() => setView(true)}>view more</Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </ListGroup.Item>
                                        </>
                                    )
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {empty ?
                            <>
                                <p className="text-danger">Empty</p>
                            </>
                            : null
                        }
                    </Row>
                </Container>
            </Card.Body>
        </Card >
    )
}

export default OpenTickets;