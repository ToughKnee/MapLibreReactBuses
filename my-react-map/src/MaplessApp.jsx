
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import ButtonComponent from "./ButtonComponent";

// Connect to the socket server for real time updating
const socket = io('http://localhost:3000');

function MaplessApp({ onIncrement, onUpdateBusPositions }) {
  const [isConnected, setIsConnected] = useState(false);
  const [busPositionsArray, setbusPositionsArray] = useState([]);

  //===========================  Socket configuration
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    // Actual update of the bus positions received from the server(which is what happens in the real world)
    socket.on('busPositionUpdate', (data) => {
      onUpdateBusPositions(data.busPositions); // Call the function to update bus positions in the parent component
      // setbusPositionsArray(busPositionsArray => [...busPositionsArray, data]);
      console.log('Received data :', data);
      console.log('Current bus array after update :', busPositionsArray);
    });

    // Clean socket listeners on unmount to prevent more unintended connections 
    return () => {
      socket.off('connect');
      socket.off('busPositionUpdate');
    };
  }, []);
  //======

  const incrementCount = () => {
    onIncrement();
    console.log('incrementCountadlkjslkjslkj');
    let aaaaa = 999999;
    console.log(`isConnected ${aaaaa}`);

    // Emit a message to the server to update the bus position, PURELY for testing to simulate the moment we receive an update from the actual server to update the bus positions
    socket.emit('busPositionUpdate', {
      id: socket.id
    });
  };

  return (
    <div
      className="absolute right-4 top-4"
      style={{
        top: "10%",
        left: "90%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default MaplessApp;