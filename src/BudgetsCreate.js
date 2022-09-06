import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import basicBudgets from "./data/basicBudgets";

function BudgetsCreate() {
  const [budgets, setBudgets] = React.useState(basicBudgets);
  const [budgetName, setBudgetName] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");

  const navigate = useNavigate();

  const changeAmount = (budgetIndex, amount) => {
    const newBudgets = budgets;
    newBudgets[budgetIndex].amount = amount;
    setBudgets(newBudgets);
  };

  const handleSubmit = () => {
    const body = {
      name: budgetName,
      rows: budgets,
    };
    fetch("https://glou-back.herokuapp.com/budgets", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        navigate("/result", { state: json });
      })
      .catch((err) => {
        console.log(err, "error");
        alert("Error en la request, revisa los valores ingresados");
      });
  };

  return (
    <div>
      <h2>Crear presupuesto</h2>
      <Container>
        <Row>
          <Col>
            <table>
              <tbody>
                <tr>
                  <td>Nombre del presupuesto</td>
                  <td>
                    <Form.Control
                      type="text"
                      onChange={(event) => {
                        setBudgetName(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Access token</td>
                  <td>
                    <Form.Control
                      type="text"
                      onChange={(event) => {
                        setAccessToken(event.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!accessToken}
            >
              Guardar
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            <table className="BudgetsTable">
              <tbody>
                <tr>
                  <th>Tipo</th>
                  <th>Categoría</th>
                  <th>Subcategoría</th>
                  <th>Nombre</th>
                  <th>Monto</th>
                </tr>
                {budgets.map((budget, index) => {
                  return (
                    <tr key={index}>
                      <td>{budget.isExpense ? "Gasto" : "Ingreso"}</td>
                      <td>{budget.category}</td>
                      <td>{budget.subcategory}</td>
                      <td>{budget.name}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min={0}
                          onChange={(event) => {
                            changeAmount(index, parseInt(event.target.value));
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BudgetsCreate;
