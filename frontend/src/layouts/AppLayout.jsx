import { DropdownMenu } from '../componentes/common/dropDownMenu';
import styles from '../styles/Layout.module.css';
import miImagen from '../image/Wecards.webp';
import { useNavigate } from 'react-router-dom';

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.layoutHeader}>
        <div className={styles.imageHeader}>
          <img src={miImagen} className={styles.image} alt="Mi imagen" 
          onClick={() => navigate('/groups')} />
        </div>
        <DropdownMenu />
      </div>
      <main className={styles.layoutMain}>
        {children}
      </main>
    </>
  );
}
