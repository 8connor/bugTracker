import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios";

function View(props) {
    const [imgArr, setImgArr] = useState([]);

    useEffect(() => {
        let obj = {
            ticket: props.ticket
        }

        axios.post("/api/ticketPics", obj)
            .then(response => setImgArr(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (e) => {
        let obj = {
            _id: e
        }

        axios.post("/api/resolveTicket", obj)
            .then(data => {
                console.log(data.data);
            }).catch(err => console.log(err))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <h4>
                        Project: {props.ticket.project}
                    </h4>
                </Col>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <p>
                        Bug description: {props.ticket.description}
                    </p>
                </Col>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <p>
                        Severity: {props.ticket.severity}
                    </p>
                </Col>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="text-right"
                >

                    <Button className="mb-5 mt-3 mr-5" variant="success" onClick={() => handleDelete(props.ticket._id)}>Mark as resolved</Button>
                </Col>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <Carousel>
                        {
                            imgArr.length > 0 ?
                                imgArr.map((image, i) =>
                                    <Carousel.Item key={i}>
                                        <img
                                            className="d-block w-100 img-fluid"
                                            alt={props.ticket.description} src={window.origin + "/" + image.location}
                                        />
                                    </Carousel.Item>
                                )
                                : ""
                        }
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default View;