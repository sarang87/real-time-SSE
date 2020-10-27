import React from 'react';
import './App.css';
import TableContainer from "./components/TableContainer"
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer />
    </Container>
  );
}

export default App;