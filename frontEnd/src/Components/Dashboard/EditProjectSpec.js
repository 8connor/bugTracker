import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Axios from "axios"
import ListGroup from 'react-bootstrap/ListGroup'
import "./index.css"


function EditProjectSpec(props) {

    useEffect(() => {
        console.log(props.projData)

    })

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
                >
                    <h4><u>Project name:</u></h4>
                    <h4>{props.projData.name}</h4>
                </Col>
                <Col
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}

                    className="text-center"
                >
                    <h4>
                        <u>
                            Member list:
                        </u>
                    </h4>
                    <br />
                    <ul>
                        {props.projData.members.length === 0 ? 
                            <p>Empty</p>
                                :
                                props.projData.members.map((names, i) =>
                                    <li key={i}>{names}</li>
                                )
                        }
                    </ul>
                    <Row className="justify-content-center">
                        <Button>Add Member</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
                >
                    <h4><u>Description:</u></h4>
                </Col>
                <Col
                    sm={{ span: 12, offset: 0 }}
                    md={{ span: 12, offset: 0 }}
                    lg={{ span: 12, offset: 0 }}
                >
                    <p>{props.projData.desc}</p>
                </Col>
            </Row>
            <Row>
            </Row>
        </Container >
    )
}

export default EditProjectSpec;