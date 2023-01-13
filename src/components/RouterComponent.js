import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, RoomView } from "./";

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Login />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:id" element={<RoomView />} />
      {/*-------------------- a page for where the game actually takes place---------------------*/}
      <Route path="/room/:id/playing" />
      {/*-------------------- a FAQ page--------------------*/}
      <Route path="/faq" />
      {/*-------------------- about us--------------------*/}
      <Route path="/about" />
    </Routes>
  );
};
export default RouterComponent;
