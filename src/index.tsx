import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootEle = document.getElementById("root");
if (!rootEle) throw new Error("No root element in DOM.");

const root = ReactDOM.createRoot(rootEle);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
