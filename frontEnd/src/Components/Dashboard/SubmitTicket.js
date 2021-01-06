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
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");

    const config = {
        resize: "none"
    }

    useEffect(() => {
        Axios.get("/api/projects")
            .then(response => {
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
            description: description,
            severity: severity
        }

        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);

        console.log(formData)

        Axios.post("/api/makeTicket", obj)
            .then(response => {
                console.log(response);
                setSelected("");
                setDescription("");
                setSeverity("");

                document.querySelectorAll(".entry").forEach(text => text.value = "");
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
                                <DropdownButton title={`${selected === "" ? `select a project` : selected}`}>
                                    {projects.length === 0 ? <Dropdown.Item disabled>Empty</Dropdown.Item>
                                        :
                                        projects.map((item, i) =>
                                            <Dropdown.Item onClick={() => setSelected(item.name)}>{item.name}</Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                                <br />
                                <p>Bug description:</p>
                                <Form.Control as="textarea" rows={3} placeholder="Bug description" className="entry" onChange={(e) => setDescription(e.target.value)} style={config} />
                                <br />
                                <p>Bug severity:</p>
                                <DropdownButton title={`${severity === "" ? `select severity` : severity}`}>
                                    <Dropdown.Item onClick={(e) => setSeverity(e.target.innerHTML)}>Minor</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setSeverity(e.target.innerHTML)}>Moderate</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setSeverity(e.target.innerHTML)}>Severe</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                            <form method="POST" action="/api/upload" encType="multipart/form-data" id="myForm">
                                <div>
                                    <label>Select your profile picture:</label> <input type="file" name="image" />
                                </div>
                                <div>
                                    <input type="submit" name="btn_upload_profile_pic" value="Upload" />
                                </div>
                            </form>
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