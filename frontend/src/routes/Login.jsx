import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import "../styles/login.css";
import miImagen from "../image/Wecards.webp";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/groups");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      login(token);
      navigate("/groups");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="main">
      <div className="main-container-login">

        <h1>Login</h1>
        
        <div className="input-wrapper">  
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
          />
        </div>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((prev) => !prev)}
          >
              <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
          </button>

        </div>

        <div className="forgot-password-link">
              <p>¿Olvidaste tu contraseña? 
                <a href="/recover-password" onClick={() => navigate("/RecoverPassword")}>
                Recuperar contraseña
                </a>
              </p>
        </div>   

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <div className="register-link">
          <p>¿No tienes una cuenta? 
              <a href="/register" onClick={() => navigate("/Register")}>
                  Regístrate
              </a>
          </p>
        </div>

      </div>

      <div className="image-container">
        <img src={miImagen} className="imagen-destacada" alt="Mi imagen" />
      </div>
    </div>
);
}
