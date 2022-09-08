import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BudgetsCreate from "./BudgetsCreate";
import Nav from "react-bootstrap/Nav";
import BudgetsResult from "./BudgetsResult";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav className="justify-content-end" variant="pills">
          <Nav.Item>
            <Nav.Link href="/login" eventKey="result">
              Iniciar Sesión
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/create" eventKey="create">
              Crear presupuesto
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/result" eventKey="result">
              Situación actual
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<BudgetsCreate />}></Route>
          <Route path="/result" element={<BudgetsResult />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
