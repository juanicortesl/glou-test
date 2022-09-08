import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BudgetsCreate from "./BudgetsCreate";
import Nav from "react-bootstrap/Nav";
import BudgetsResult from "./BudgetsResult";
import Login from "./Login";
import React from "react";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div className="App">
        {isLoggedIn && (
          <Nav className="justify-content-end" variant="pills">
            <Nav.Item>
              <Nav.Link onClick={logOut}>Cerrar Sesión</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/create" eventKey="create">
                Crear presupuesto
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        <Routes>
          <Route
            exact
            path="/"
            component={
              isLoggedIn ? <Navigate to="/create" /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <BudgetsCreate />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/result"
            element={
              <PrivateRoute>
                <BudgetsResult />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
