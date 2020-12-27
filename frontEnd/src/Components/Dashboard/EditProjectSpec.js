import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import "./index.css";


function EditProjectSpec(props) {
    const [search, setSearch] = useState(false);
    const [value, setValue] = useState("");
    const [users, setUsers] = useState([]);

    const handleSearch = () => {
        setSearch(true);
    }

    const handleAdd = (a) => {
        setSearch(false);

        let obj = {
            _id: props.projData._id,
            name: a
        }

        Axios.post("/api/addProjUser", obj)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setValue(e.target.value)

        let obj = {
            name: value
        }

        Axios.post("/api/searchUsers", obj)
            .then(response => {
                console.log(response.data);

                setUsers(response.data);
            })
            .catch(err => console.log(err))

    }

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
            <Row className="justify-content-center">
                <Col
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}

                    className="text-center"
                >
                  
                    <h4>
                   
                        Member list:
                     
                    </h4>
                  
                    {props.projData.members.length === 0 ?
                        <p>Empty</p>
                        :
                        props.projData.members.map((names, i) =>
                            <p key={i}>{names.name}</p>
                        )
                    }
              
                        
                </Col>
                <Col
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
                >
                    {search ?
                            null
                            :
                            <Button onClick={handleSearch}>Add Member</Button>
                        }
                    {search ?
                           <> 
                                <Form.Group>
                                    <Form.Control size="sm" type="text" placeholder="Name" onChange={(e) => handleChange(e)} />
                                </Form.Group>
                           
                                {users.length === 0 ?
                                    null
                                    :
                                    users.map((user, i) =>
                                        <p key={i}>{user.name} <Button onClick={() => handleAdd(user.name)}>Add</Button></p>
                                    )
                                }
                          </>
                         : null
                    }
                </Col>
               
            </Row>
        </Container >
    )
}

export default EditProjectSpec;