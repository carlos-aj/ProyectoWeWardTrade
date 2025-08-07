import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import RecoverPassword from "./routes/RecoverPassword";
import ResetPassword from "./routes/ResetPassword";
import Groups from "./routes/Groups";
import Perfil from "./routes/Perfil";
import Cards from "./routes/Cards";
import Friends from "./routes/Friends";
import Mail from "./routes/Mail";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";


function App() {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/groups"
          element={
            <AppLayout>
              <Groups />
            </AppLayout>
          }
        />
        <Route
          path="/perfil"
          element={
            <AppLayout>
              <Perfil />
            </AppLayout>
          }
        />
        <Route
          path="/cards"
          element={
            <AppLayout>
              <Cards />
            </AppLayout>
          }
        />
        <Route
          path="/friends"
          element={
            <AppLayout>
              <Friends />
            </AppLayout>
          }
        />
        <Route
          path="/mail"
          element={
            <AppLayout>
              <Mail />
            </AppLayout>
          }
        />
      </Routes>
    </AuthProvider>
    
  );
}

export default App;
