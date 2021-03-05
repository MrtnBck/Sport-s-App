import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "reactstrap";
import Routes from "./routes";
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Sport's App</h1>
        <Routes/>
      </Container>
    </div>
  );
}

export default App;
