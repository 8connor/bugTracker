import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup'
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";

function NavigationList() {
    const [create, setCreate] = useState(true);
    const [edit, setEdit] = useState(false);

    const handleClick = (e) => {

        switch (e.target.innerHTML) {
            case "Create project":
                setCreate(true);
                setEdit(false);
                break;
            case "Edit projects":
                setCreate(false)
                setEdit(true);
        }

    }

    return (
        <>
            <Col sm={{ span: 12, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 4, offset: 0 }}>
                <Card>
                    <Card.Title className="bg-dark text-light">
                        <p className="ml-3 mt-2">
                            Navigation pane
                </p>
                    </Card.Title>
                    <Card.Body>
                        <Tab.Container id="list-group-tabs-example">
                            <Row>
                                <Col sm={12}>
                                    <ListGroup>
                                        <ListGroup.Item action className={create ? "active" : null} onClick={(e) => { handleClick(e) }}>
                                            Create project
                                        </ListGroup.Item>
                                        <ListGroup.Item action className={edit ? "active" : null} onClick={(e) => { handleClick(e) }}>
                                            Edit projects
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
            <Col
                sm={{ span: 12, offset: 0 }}
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}

                className="ml-5"
            >
                {
                    create ?
                        <CreateProject />
                        :
                        null
                }
                {
                    edit ?
                        <EditProject />
                        :
                        null
                }
            </Col>
        </>
    )
}

export default NavigationList;