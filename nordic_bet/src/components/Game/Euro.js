import React, { useState, useEffect } from "react";
import Groups from "./Groups";
import Brackets from "./Brackets";
import Groupsinfo from "./Groupsinfo";
import { Parallax } from "react-parallax";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";
function Euro() {
  const initialValues = {
    typeOfView: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  function handleOnChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  useEffect(() => {}, [formValues]);

  const image1 =
    "https://images.unsplash.com/photo-1531819318554-84abdf082937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2246&q=80";

  return (
    <>
      {formValues.typeOfView === "" ? (
        <Parallax
          bgImage={image1}
          className="min-vh-100 opacity-75"
          strength={500}
        >
          <div>
            <Row className="g-2 mt-3">
              <Col md></Col>
              <Col md></Col>

              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Välj">
                  <Form.Select
                    aria-label="Floating label select example"
                    className="opacity-75"
                    name="typeOfView"
                    id="view"
                    value={formValues.view}
                    onChange={handleOnChange}
                  >
                    <option>Öppna alternativ</option>
                    <option value="GroupView">Grupper</option>
                    <option value="EliminationView">Utslags-turnering</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md></Col>
              <Col md></Col>
            </Row>
          </div>
          <br />
          <div className="mt-5" style={{}}>
            <h1
              className="text-white mt-5"
              style={{ fontSize: "6vw", marginRight: "50%" }}
            >
              Välkommen!
            </h1>
            <h3
              className="text-white"
              style={{ fontSize: "3vw", marginTop: "15%" }}
            >
              Vänligen välj om du vill se grupperna eller
              <br /> om du vill se utslags-turneringen{" "}
            </h3>
          </div>
        </Parallax>
      ) : (
        <></>
      )}
      {formValues.typeOfView === "GroupView" ? (
        <>
          <Parallax bgImage={image1} strength={1500}>
            <br />
                      <div style={{paddingBottom: '5%'}}>
            <Row className="g-2 mt-3">
              <Col md></Col>
              <Col md></Col>

              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Välj">
                  <Form.Select
                    aria-label="Floating label select example"
                    className="opacity-75"
                    name="typeOfView"
                    id="view"
                    value={formValues.view}
                    onChange={handleOnChange}
                  >

                    <option value="GroupView">Grupper</option>
                    <option value="EliminationView">Utslags-turnering</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md></Col>
              <Col md></Col>
            </Row>
          </div>
            <div cstyle={{ height: "auto" }}></div>
            <Groupsinfo /> <Groups />
          </Parallax>
        </>
      ) : (
        <></>
      )}
      {formValues.typeOfView === "EliminationView" ? (
        <>
        <Parallax bgImage={image1} strength={1500}>
        <br/>
        <div style={{paddingBottom: '5%'}}>
            <Row className="g-2 mt-3">
              <Col md></Col>
              <Col md></Col>

              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Välj">
                  <Form.Select
                    aria-label="Floating label select example"
                    className="opacity-75"
                    name="typeOfView"
                    id="view"
                    value={formValues.view}
                    onChange={handleOnChange}
                  >
                    <option value="EliminationView">Utslags-turnering</option>
                    <option value="GroupView">Grupper</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md></Col>
              <Col md></Col>
            </Row>
          </div>
          <br />
          <Brackets />
          </Parallax>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Euro;
