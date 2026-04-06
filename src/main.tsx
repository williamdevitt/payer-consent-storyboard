import React from "react";
import ReactDOM from "react-dom/client";
import PatientDashboard from "./components/PatientDashboard";
import { MantineProvider } from "@mantine/core";
// @ts-ignore
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <PatientDashboard />
    </MantineProvider>
  </React.StrictMode>,
);
