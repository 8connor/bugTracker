import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import anime from "animejs/lib/anime.js";
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import View from "./OpenTicketsView.js";

function OpenTickets() {
    const [tickets, setTickets] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [selected, setSelected] = useState();
    const [view, setView] = useState(false);
    const [index, setIndex] = useState();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setDeleted(false)

        axios.get("/api/tickets")
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
    }, [deleted]);

    const handleSelect = (e, a) => {
        setView(true);
        setSelected(e);
        setIndex(a);
    }

    const handleDelete = (e, a) => {
        let obj = {
            _id: e
        }

        axios.post("/api/resolveTicket", obj)
            .then(data => {
                console.log(data.data);
                setDeleted(true);
                setView(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <Card className="shadow">
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Open tickets
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                {
                    view ?
                        <>
                            <Button
                                onClick={
                                    () => {
                                        setView(false)
                                    }
                                }
                            >
                                Back
                            </Button>
                            <View ticket={selected} />
                            <Button className="mb-5 mt-3 mr-5" variant="success" onClick={() => handleDelete(selected._id, index)}>Mark as resolved</Button>
                        </>
                        :
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
                                                                <Button onClick={() => handleSelect(item, i)}>view more</Button>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </ListGroup.Item>
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
                }
            </Card.Body>
        </Card >
    )
}

export default OpenTickets;