// // SocketContext.js
// import React, { createContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext();

// const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8080", { withCredentials: true });
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     }
//   }, []);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// export { SocketContext, SocketProvider };

// export const deleteSocket = ({socket}) => {
//     try {
//       console.log(socket);
//       socket.disconnect();
//       console.log(socket);
//     } catch (error) {
        
//     }
// };