import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./index.css";

function HomePage() {
    return (
        <div className="parallax">
            <Container>
                <Row className="justify-content-center">
                    <h1 className="text-danger homeHeader">
                        This is Bug Tracker
                    </h1>
                </Row>
                <Row className="justify-content-center">
                    <h2 className="text-light homeHeader ml-2">
                        A simplistic way to track bug tickets.
                    </h2>
                </Row>
            </Container>
        </div>
    )
};

export default HomePage;