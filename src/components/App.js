import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import RoomView from "./RoomView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/room/:id" element={<RoomView />} />
    </Routes>
  );
};

export default App;
