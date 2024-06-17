import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

function KioskTable() {
  const [kiosks, setKiosks] = useState({});
  const [kioskInfo, setKioskInfo] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [totalSolved, setTotalSolved] = useState(0);

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/kiosk/')
      .then(response => {
        const initialKiosks = {};
        const initialKioskInfo = {};
        console.log(":::response", response);
        response.data.forEach(kiosk => {
          initialKiosks[kiosk.id] = kiosk.last_ticket_assigned.id || "";
          initialKioskInfo[kiosk.id] = kiosk;
          setTotalSolved(kiosk.tickets_resolved_today);
        });
        setKiosks(initialKiosks);
        setKioskInfo(initialKioskInfo);
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
      
      const { kiosk, ticket, status, total_solved } = message.response;
      if (status==='assigned') {
        setKiosks(prevKiosks => ({
            ...prevKiosks,
            [kiosk]: ticket
        }));
      }

      setTotalSolved(total_solved);
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
        <Table striped bordered hover style={{ width: 'auto', minWidth: '100%', padding: '20px' }}>
        <thead>
            <tr>
                {Object.entries(kiosks).map(([kiosk, ticket], index) => (
                    <th key={kiosk} style={{ textAlign: 'center' }}>
                        <div>Kiosk / Counter</div>
                        <div style={{ fontSize: '2em' }}>{kioskInfo[kiosk].body}</div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            <tr>
              {Object.entries(kiosks).map(([kiosk, ticket], index) => (
                <td key={kiosk} style={{ textAlign: 'center', minHeight: '50px', fontSize: '6em' }}>{ticket || "N/A"}</td>
              ))}
            </tr>
          </tbody>
        </Table>
        {/* New Table for Displaying Tickets Solved Today */}
        <Table striped bordered hover style={{ width: 'auto', minWidth: '100%', padding: '20px', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Tickets Solved Today</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '2em' }}>{totalSolved}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default KioskTable;
