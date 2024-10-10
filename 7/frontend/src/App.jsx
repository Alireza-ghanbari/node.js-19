import React from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="container mx-auto px-8">
      <Home />

      <Login />

      <Toaster />
    </div>
  );
}
