import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup'
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";
import OpenTickets from "./OpenTickets";

function NavigationList() {
    const [create, setCreate] = useState(true);
    const [edit, setEdit] = useState(false);
    const [tickets, setTickets] = useState(false);

    const handleClick = (e) => {

        switch (e.target.innerHTML) {
            case "Create project":
                setCreate(true);
                setTickets(false);
                setEdit(false);
                break;
            case "Edit projects":
                setCreate(false);
                setTickets(false);
                setEdit(true);
                break;
            case "Open tickets":
                setCreate(false);
                setTickets(true);
                setEdit(false);
                break;
            default:
            //do nothing
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
                                        <ListGroup.Item action className={tickets ? "active" : null} onClick={(e) => { handleClick(e) }}>
                                            Open tickets
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
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}

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
                 {
                    tickets ?
                        <OpenTickets />
                        :
                        null
                }
            </Col>
        </>
    )
}

export default NavigationList;