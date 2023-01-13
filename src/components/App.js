import { Button } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router";
import RedTeamBox from "./teamBoxes/RedTeamBox";
/**
 * This is the entry point for all of our react stuff
 */
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/redteam" element={<RedTeamBox />} />
      </Routes>
      {/* <h1>Welcome to dsfghjkl, Good luck!</h1>
      <Button variant="contained">Hello World</Button> */}
    </div>
  );
};

export default App;
