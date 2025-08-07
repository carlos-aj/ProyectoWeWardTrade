import ArrowBack from "../componentes/common/arrowBack";
import "../styles/arrowBack.css";
import { useState } from "react";
import "../styles/recoverPassword.css";


export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRecover = async () => {
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("http://localhost:5000/api/users/request-password-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Revisa tu correo para continuar el proceso de recuperación.");
            } else {
                setMessage(data.message || "Error al solicitar recuperación");
            }
        } catch (err) {
            setMessage("Error de red. Intenta de nuevo.");
        }
        setLoading(false);
    };

    return (
        <div className="main">
            <div className="main-container-recover-password">
                <ArrowBack className="arrow-back-recover-password" where="/" />
                <h1>Recover Password</h1>
                <p>Introduce tu email asociado a tu cuenta para recuperar tu contraseña</p>
                <div className="input-wrapper-recover-password">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field-recover-password"
                        disabled={loading}
                    />
                </div>
                <button className="button" onClick={handleRecover} disabled={loading || !email}>
                    {loading ? "Enviando..." : "Enviar recuperación"}
                </button>
                {message && <p className="recover-message">{message}</p>}
            </div>
        </div>
    );
}