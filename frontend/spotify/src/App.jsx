import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Login/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Home />} />

      {/* Route bảo vệ (chỉ truy cập khi đã đăng nhập) */}
      <Route
        path="/admin"
        element={<PrivateRoute element={<AdminDashboard />} />}
      />

      {/* Route không tồn tại */}
      <Route path="*" element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
}

export default App;
