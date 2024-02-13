import React from "react";

import EnterprisePage from "./pages/EnterprisePage";
import UserPage from "./pages/UserPage";

import "./App.css";

function App() {
  return (
    <div className="container">
      <EnterprisePage />
      <UserPage />
    </div>
  );
}

export default App;
