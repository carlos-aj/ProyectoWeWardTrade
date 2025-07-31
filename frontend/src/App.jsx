import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
