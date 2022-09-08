import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CreateRowModal({ show, handleClose, handleShow, addRow }) {
  const [isExpense, setIsExpense] = useState(false);
  const [category, setCategory] = useState("Hogar");
  const [subcategory, setSubcategory] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    addRow({
      isExpense: isExpense,
      category: category,
      subcategory: subcategory,
      name: name,
      amount: 0,
    });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva fila</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            onChange={(event) => {
              setIsExpense(event.target.value === "false");
            }}
          >
            <option value={true}>Ingreso</option>
            <option value={false}>Gasto</option>
          </Form.Select>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value={"Hogar"}>Hogar</option>
            <option value={"Familia/Personal"}>Familia/Personal</option>
            <option value={"Financieros"}>Financieros</option>
          </Form.Select>
          <Form.Label>Subcategoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa subcategoría"
            onChange={(event) => {
              setSubcategory(event.target.value);
            }}
          ></Form.Control>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa nombre"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!name}>
            Crear fila
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRowModal;
