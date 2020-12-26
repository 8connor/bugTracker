import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import anime from "animejs/lib/anime.js";
import Axios from "axios";

function CreateProject() {

    useEffect(()=> {
        anime({
            targets: ".projCard",
            scale: [0, 1],
            easing: 'easeInOutExpo',
            duration: 400,
        });
    }, []);

    //removes the resizing on the text area.
    const config = {
        resize: "none"
    }
    // this will submit the information for the new project using a post.
    const handleSubmit = () => {
        // grabbing the data from the text inputs.
        let projObj = {
            name: document.getElementById("projName").value,
            desc: document.getElementById("projDesc").value
        };

        Axios.post("/api/createProj", projObj)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err));
    }

    return (
        <Card>
            <Card.Title className="bg-dark text-light">
                <p className="ml-3 mt-2">
                    Create Project
                </p>
            </Card.Title>
            <Card.Body className="projCard">
                <Container>
                    <Row>
                        <Col>
                            <Form.Group>
                                <p>Project name:</p>
                                <Form.Control size="md" type="text" placeholder="Project name" id="projName" />
                                <br />
                                <p>Project description:</p>
                                <Form.Control as="textarea" rows={2} placeholder="Project description" style={config} id="projDesc"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button type="button" onClick={handleSubmit}>Submit</Button>
                    </Row>
                </Container>
            </Card.Body>
        </Card >
    )
}

export default CreateProject;