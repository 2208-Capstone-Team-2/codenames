import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Lobby/Login";
import RoomView from "./RoomView/RoomView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/room/:id" element={<RoomView />} />
    </Routes>
  );
};

export default App;
