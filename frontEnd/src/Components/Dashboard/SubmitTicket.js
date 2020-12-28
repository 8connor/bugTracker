import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import anime from "animejs/lib/anime.js";
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/esm/Button";

function SubmitTicket() {
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState("");

    const config = {
        resize: "none"
    }

    useEffect(() => {
        Axios.get("/api/projects")
            .then(response => {
                console.log(response.data);

                setProjects(response.data);
            })
            .catch(err => console.log(err));

        anime({
            targets: ".projCard",
            scale: [0, 1],
            easing: 'easeInOutExpo',
            duration: 400,
        });
    }, []);

    const handleSubmit = () => {
        let obj = {
            project: selected,
            description: document.getElementById("description"),
            severity: document.getElementById("severity")
        }

        Axios.post("/api/makeTicket", obj)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err))
    }

    return (
        <Card>
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Submit ticket
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                <Container>
                    <Row>
                        <Col>
                            <Form.Group>
                                <p>Project name:</p>
                                <DropdownButton title={`${selected.length === 0 ? `select a project` : selected}`}>
                                    {projects.length === 0 ? null :
                                        projects.map((item, i) =>
                                            <Dropdown.Item onClick={() => setSelected(item.name)}>{item.name}</Dropdown.Item>
                                        )
                                    }

                                </DropdownButton>
                                <br />
                                <p>Bug description:</p>
                                <Form.Control as="textarea" rows={3} placeholder="Bug description" id="description" style={config} />
                                <br />
                                <p>Bug severity:</p>
                                <Form.Control size="md" type="text" placeholder="Bug severity" id="severity" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Row>
                </Container>
            </Card.Body>
        </Card >
    )
}

export default SubmitTicket;