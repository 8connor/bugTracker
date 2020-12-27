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
import EditProjectSpec from "./EditProjectSpec";
import "./index.css"


function EditProject() {
    const [list, setList] = useState([])
    const [empty, setEmpty] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState()

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

    const handleEdit = (a) => {
        setEdit(true);
        setSelected(a)
    }

    return (
        <Card>
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Edit Project
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                {
                    edit ?

                        <Container>
                            <Row>
                                <Col
                                    sm={{ span: 2, offset: 0 }}
                                    md={{ span: 2, offset: 0 }}
                                    lg={{ span: 2, offset: 0 }}
                                >
                                    <Button onClick={() => setEdit(false)}>Back</Button>
                                </Col>
                            </Row>
                            <Row className="editProj">
                                <EditProjectSpec projData={selected} />
                            </Row>
                        </Container>

                        :

                        <Container>
                            <Row className="justify-content-center">
                                <Col
                                    sm={{ span: 12, offset: 0 }}
                                    md={{ span: 12, offset: 0 }}
                                    lg={{ span: 12, offset: 0 }}
                                >
                                    <ListGroup variant="flush">
                                        {list.length === 0 ?
                                            empty ? null :
                                                <Row className="justify-content-center">
                                                    <Spinner animation="border" />
                                                </Row>
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
                                                                    <Button variant="success" onClick={() => handleEdit(item)}>edit</Button>
                                                                    <Button variant="danger" onClick={() => handleDelete(item._id, i)}>delete</Button>
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

                }

            </Card.Body>
        </Card>
    )
}

export default EditProject;