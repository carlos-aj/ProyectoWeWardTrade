import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import "../styles/register.css";
import ArrowBack from "../componentes/common/arrowBack";
import "../styles/arrowBack.css"; 
import { useEffect } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      login(token);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setConfirmVisible(false);
    setPassword("");
  }, []);

  return (
    <div className="main">
      <div className="main-container-register">

        <ArrowBack className="arrow-back" where="/" />

        <h1>Register</h1>

        <div className="input-wrapper-register">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field-register"
          />
        </div>

        <div className="input-wrapper-register">  
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field-register"
          />
        </div>

        <div className="password-wrapper-register">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
                  setPassword(e.target.value);
                  setConfirmVisible(e.target.value.length > 0);
                  if (e.target.value.length === 0) {
                      setConfirmPassword("");
                  }
              }}
            className="input-field-register"
          />

          <button
              type="button"
              className="eye-button-register"
              onClick={() => setShowPassword((prev) => !prev)}
          >
              <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
          </button>

        </div>

        {confirmVisible && (
          <div className="password-wrapper-register slide-up">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field-register"
            />
            <button
              type="button"
              className="eye-button-register"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
            >
              <i className={showPasswordConfirm ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </button>
          </div>
        )}

        <button className="button-register" onClick={handleLogin}>
          Register
        </button>
          
      </div>
    </div>
  );
}
