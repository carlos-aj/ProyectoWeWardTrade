import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/DropDownMenu.css';

export function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="dropdown" ref={menuRef}>
      <button className="dropdown-button" onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-circle-user"></i>
      </button>

      {open && (
        <div className="dropdown-menu">
          <button className="dropdown-item delay-1" onClick={() => goTo('/cards')}>Your Cards</button>
          <button className="dropdown-item delay-2" onClick={() => goTo('/perfil')}>Perfil</button>
          <button className="dropdown-item delay-3" onClick={() => goTo('/friends')}>Friend Requests</button>
          <button className="dropdown-item delay-4" onClick={() => goTo('/mail')}>Mail</button>
          <button className="dropdown-item delay-5" onClick={() => goTo('/')}>Sign out</button>
        </div>
      )}
    </div>
  );
}
