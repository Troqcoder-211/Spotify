import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Login/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
