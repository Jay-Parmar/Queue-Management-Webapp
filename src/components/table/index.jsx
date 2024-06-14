import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

function KioskTable() {
  const [kiosks, setKiosks] = useState({});
  const [isConnected, setIsConnected] = useState(false);

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

    ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
    };
    
    ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
    };

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
      <div className="w-100">
        <div
          className={`h-1 ${isConnected ? 'bg-success' : 'bg-danger'}`} style={{ height: '4px' }}
        />
      </div>
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
    </div>
  );
}

export default KioskTable;
