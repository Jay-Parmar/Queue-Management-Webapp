import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import KioskTable from './components/table';
import { Container, Navbar } from 'react-bootstrap';
import pnn_logo from './assets/pnn_logo.png';
import essi_logo from './assets/elkosta_logo.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Navbar variant="dark" style={{ minWidth: '100%', backgroundColor: '#36454F' }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src={pnn_logo}
            width="150"
            height="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <div style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 0 }}>
          <span style={{ color: 'white', fontSize: '2rem' }}>Queue Management System</span>
        </div>
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src={essi_logo}
            width="150"
            height="auto"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
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
