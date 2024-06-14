import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Navbar } from 'react-bootstrap';

function KioskTable() {
  const [kiosks, setKiosks] = useState({});

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/kiosk/')
      .then(response => {
        const initialKiosks = {};
        console.log(":::response", response);
        response.data.forEach(kiosk => {
          initialKiosks[kiosk.id] = "";
        });
        setKiosks(initialKiosks);
      })
      .catch(error => {
        console.error('Error fetching kiosk data:', error);
      });

    const ws = new WebSocket("ws://127.0.0.1:8000/ws/data/");
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      const { kiosk, ticket, status } = message.response;
      if (status==='assigned') {
        setKiosks(prevKiosks => ({
            ...prevKiosks,
            [kiosk]: ticket
        }));
      }
      
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Queue Management Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5 pb-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kiosk Number</th>
              <th>Ticket Assigned</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kiosks).map(([kiosk, ticket]) => (
              <tr key={kiosk}>
                <td>{kiosk}</td>
                <td>{ticket}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">© 2024 ESSI Integrated Technologies Pvt Ltd</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default KioskTable;
