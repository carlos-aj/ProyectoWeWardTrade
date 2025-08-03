import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import style from "../styles/perfil.module.css";

export default function Perfil() {
  const { user, updateUser, deleteAccount } = useAuth();

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});

  const handleDelete = () => {
    const confirm = window.confirm("¿Estás seguro de que quieres borrar tu cuenta?");
    if (confirm) {
      deleteAccount();
    }
  };

  const checkUsernameExists = async (username) => {
    const response = await fetch(`/api/check-username?name=${username}`);
    const data = await response.json();
    return data.exists;
  };

  const handleSave = async (field) => {
    const value = formData[field];

    if (field === "name") {
      const exists = await checkUsernameExists(value);
      if (exists && value !== user.name) {
        setErrors({ ...errors, name: "Ese nombre de usuario ya está en uso" });
        return;
      } else {
        setErrors({ ...errors, name: null });
      }
    }

    await updateUser({ [field]: value });
    setEditingField(null);
  };

  return (
      <div className={style.perfilPage}>
        <div className={style.perfilContainer}>
          <h2>Mi Perfil</h2>

          <div className={style.perfilInfo}>
            {/* Nombre de usuario editable */}
            <div className={style.infoRow}>
              <label>Nombre de usuario:</label>
              <div className={style.infoValue}>
                {editingField === "name" ? (
                  <input
                    className={style.infoInput}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleSave("name")}
                    autoFocus
                  />
                ) : (
                  <span className={style.infoText}>{formData.name}</span>
                )}
                <div className={style.editIcon}>
                  <i className="fa-solid fa-pencil" onClick={() => setEditingField("name")} />
                </div>
              </div>
              {errors.name && <p className={style.errorMsg}>{errors.name}</p>}
            </div>

            {/* Email solo lectura */}
            <div className={style.infoRow}>
              <label>Email:</label>
              <div className={style.infoValue}>
                <span className={style.infoText}>{formData.email}</span>
              </div>
            </div>
          </div>

          <button className={style.deleteButton} onClick={handleDelete}>
            Borrar cuenta
          </button>
        </div>
    </div>
  );
}
