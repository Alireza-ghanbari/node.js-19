import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
