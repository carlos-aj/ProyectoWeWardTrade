import { useState } from 'react';
import { Link } from 'react-router-dom';

export function DropdownMenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu} >
        <i class="fa-solid fa-circle-user"></i>
      </button>

      {open && (
        <div >
          <Link to="/cards"  onClick={() => setOpen(false)}>
            Yours Cards
          </Link>
          <Link to="/perfil"  onClick={() => setOpen(false)}>
            Perfil
          </Link>
          <Link to="/friends"  onClick={() => setOpen(false)}>
            Friends Request
          </Link>
          <Link to="/mail"  onClick={() => setOpen(false)}>
            Mail
          </Link>
          <Link to="/logout"  onClick={() => setOpen(false)}>
            Cerrar sesión
          </Link>
        </div>
      )}
    </div>
  );
}

