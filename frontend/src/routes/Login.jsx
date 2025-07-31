import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import "../styles/login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="main-container">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />

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

      <button className="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
