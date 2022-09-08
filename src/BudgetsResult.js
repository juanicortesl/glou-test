import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import basicBudgets from "./data/basicBudgets";
import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

function numberWithPoints(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function BudgetsResult() {
  const [resultData, setResultData] = React.useState({});

  const { state } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // retrieve result data
    console.log(state, "state from result");
    if (state) {
      setResultData(state);
    } else {
      navigate("/create");
    }
  }, []);
  return (
    <div>
      <h2>Mi Situación actual</h2>
      {resultData.createdAt && (
        <Container>
          <Row>
            <h3>Mis ingresos:</h3>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={8}>
              <table className="BudgetsTable">
                <tbody>
                  <tr>
                    <td className="budget-summary-title">
                      <h4>Ingresos totales</h4>
                    </td>
                    <td className="budget-summary-amount">
                      <Row className="justify-content-md-center px-4">
                        <div className="budget-summary-box">
                          <p>
                            $
                            {resultData.moneyIn
                              ? numberWithPoints(resultData.moneyIn)
                              : 0}
                          </p>
                          <p>al mes</p>
                        </div>
                      </Row>
                    </td>
                    <td className="budget-summary-items px-2">
                      {resultData.rows.map((budget, index) => {
                        if (!budget.isExpense) {
                          return (
                            <div key={index}>
                              <p>
                                {budget.name}
                                {`: ${"$"}${numberWithPoints(
                                  budget.amount
                                )} al mes`}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <h3>Cuánto gastaré los próximos meses en:</h3>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={8} className="bottom-border-line">
              <table className="BudgetsTable">
                <tbody>
                  <tr>
                    <td className="budget-summary-title">
                      <h4>Gastos recurrentes</h4>
                    </td>
                    <td className="budget-summary-amount">
                      <Row className="justify-content-md-center px-4">
                        <div className="budget-summary-box blue">
                          <p>
                            $
                            {resultData.moneyOut
                              ? numberWithPoints(resultData.moneyOut)
                              : 0}
                          </p>
                          <p>al mes</p>
                        </div>
                      </Row>
                    </td>
                    <td className="budget-summary-items px-2">
                      {resultData.rows.map((budget, index) => {
                        if (budget.isExpense) {
                          return (
                            <div key={index}>
                              <p>
                                {budget.name}
                                {`: ${"$"}${numberWithPoints(
                                  budget.amount
                                )} al mes`}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={8}>
              <table className="BudgetsTable">
                <tbody>
                  <tr>
                    <td className="budget-summary-title">
                      <h4>Resto</h4>
                    </td>
                    <td className="budget-summary-amount">
                      <Row className="justify-content-md-center px-4">
                        <div className="budget-summary-box blue">
                          <p>
                            $
                            {resultData.moneyIn && resultData.moneyOut
                              ? numberWithPoints(
                                  resultData.moneyIn - resultData.moneyOut
                                )
                              : 0}
                          </p>
                          <p>al mes</p>
                        </div>
                      </Row>
                    </td>
                    <td className="budget-summary-items px-2">
                      <Row>
                        <Col sm={2}>
                          <img
                            src={require("./icons/icons8-flecha-48.png")}
                            className={"arrow-icon"}
                          />
                        </Col>
                        <Col>
                          <p>Esto nos queda para otros gastos y ahorro</p>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default BudgetsResult;
