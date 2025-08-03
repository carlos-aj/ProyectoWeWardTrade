import ArrowBack from "../componentes/common/arrowBack";
import "../styles/arrowBack.css";
import { useState } from "react";
import "../styles/recoverPassword.css";


export default function RecoverPassword() {
    const [email, setEmail] = useState("");

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
                    />
                    </div>

            </div>
        </div>  
    );
}