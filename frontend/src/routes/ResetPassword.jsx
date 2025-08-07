import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/recoverPassword.css";

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleReset = async () => {
        if (!password || password.length < 6) {
            setMessage("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (password !== confirm) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("http://localhost:5000/api/users/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Contraseña restablecida correctamente. Redirigiendo...");
                setTimeout(() => navigate("/"), 2000);
            } else {
                setMessage(data.message || "Error al restablecer contraseña");
            }
        } catch (err) {
            setMessage("Error de red. Intenta de nuevo.");
        }
        setLoading(false);
    };

    return (
        <div className="main">
            <div className="main-container-recover-password">
                <h1>Restablecer contraseña</h1>
                <p>Introduce tu nueva contraseña</p>
                <div className="input-wrapper-recover-password">
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-field-recover-password"
                        disabled={loading}
                    />
                </div>
                <div className="input-wrapper-recover-password">
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        className="input-field-recover-password"
                        disabled={loading}
                    />
                </div>
                <button className="button" onClick={handleReset} disabled={loading || !password || !confirm}>
                    {loading ? "Restableciendo..." : "Restablecer contraseña"}
                </button>
                {message && <p className="recover-message">{message}</p>}
            </div>
        </div>
    );
}
