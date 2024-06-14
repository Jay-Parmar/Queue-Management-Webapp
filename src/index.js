import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import KioskTable from './components/table';
import { Container, Navbar } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Queue Management Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
    <KioskTable />
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">© 2024 ESSI Integrated Technologies Pvt Ltd</Navbar.Brand>
      </Container>
    </Navbar>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
