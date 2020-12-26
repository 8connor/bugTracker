import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import NavigationList from "./NavigationList";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";

function Dashboard() {
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        
        if (isAuthenticated === true) {
            Axios.post("/api/addUser", user)
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => console.log(err))
        } else {
            console.log("not authenticated")
        }
    }, [])

    return (
        <Container>
            <Row>
                <Col className="mt-5" sm={{ span: 12, offset: 0 }} md={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <Card border="primary" className="shadow">
                        <Card.Title className="bg-dark text-light">
                            <p className="ml-3 mt-2">
                                Admin Dash
                            </p>
                        </Card.Title>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <NavigationList />
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;