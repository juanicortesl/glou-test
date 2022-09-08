import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    const body = {
      password: password,
      email: email,
    };
    fetch("https://glou-back.herokuapp.com/auth", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        localStorage.setItem("accessToken", json.accessToken);
        setIsLoggedIn(true);
        navigate("/create");
      })
      .catch((err) => {
        console.log(err, "error");
        alert("Error en la request, revisa los valores ingresados");
      });
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-2">
              <Card.Title>Iniciar Sesión</Card.Title>

              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese correo"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <Button
                variant="primary"
                type="submit"
                disabled={!email || !password}
                onClick={() => {
                  handleSubmit();
                }}
                className="m-2"
              >
                Ingresar
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
