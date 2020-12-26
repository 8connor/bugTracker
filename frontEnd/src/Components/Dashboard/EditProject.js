import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Axios from "axios"
import anime from "animejs/lib/anime.js";
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner';
import "./index.css"


function EditProject() {
    const [list, setList] = useState([])
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        Axios.get("/api/projects")
            .then(res => {
                setEmpty(res.data.length === 0 ? true : false);

                setList(res.data);
            })
            .catch(err => {
                console.log(err)
                setEmpty(true);
            });

        anime({
            targets: ".projCard",
            scale: [0, 1],
            easing: 'easeInOutExpo',
            duration: 400,
        });
    }, []);

    const handleDelete = (e, i) => {
        let obj = {
            _id: e
        }

        Axios.post("/api/deleteProj", obj)
            .then(response => {
                console.log(response);
                document.getElementById(i).remove()
            })
            .catch(err => console.log(err));
    }

    return (
        <Card>
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Edit Project
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                <Container>
                    <Row className="justify-content-center">
                        <ListGroup variant="flush">
                            {list ?
                                empty ? null : <Spinner animation="border" />
                                : list.map((item, i) =>
                                    <>
                                        <ListGroup.Item key={i} id={i}>
                                            <Container>
                                                <Row>
                                                    <Col
                                                        sm={{ span: 6, offset: 0 }}
                                                        md={{ span: 6, offset: 0 }}
                                                        lg={{ span: 6, offset: 0 }}
                                                    >
                                                        {item.name}
                                                    </Col>
                                                    <Col
                                                        sm={{ span: 6, offset: 0 }}
                                                        md={{ span: 6, offset: 0 }}
                                                        lg={{ span: 6, offset: 0 }}

                                                        className="buttonCol"
                                                    >
                                                        <Button variant="success">edit</Button>
                                                        <Button variant="danger" onClick={() => handleDelete(item._id, i)}>delete</Button>
                                                    </Col>
                                                </Row>
                                            </Container>

                                        </ListGroup.Item>
                                    </>
                                )
                            }
                        </ListGroup>
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
        </Card>
    )
}

export default EditProject;