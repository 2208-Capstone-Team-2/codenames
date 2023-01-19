import { Routes, Route } from "react-router-dom";
import { Login, RoomView, About } from ".";

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Login />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:id" element={<RoomView />} />
      {/*-------------------- a page for where the game actually takes place---------------------*/}
      <Route path="/room/:id/playing" />
      {/*-------------------- about us--------------------*/}
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
export default RouterComponent;
