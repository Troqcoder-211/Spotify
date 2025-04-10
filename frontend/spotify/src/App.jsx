import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './Pages/Admin/AdminDashboard';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/admin' element={<AdminDashboard />} />
			<Route path='*' element={<div>404 NOT FOUND</div>} />
		</Routes>
	);
}

export default App;
