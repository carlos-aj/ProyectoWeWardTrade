import { useNavigate } from "react-router-dom";

export default function ArrowBack({ where }) {
  const navigate = useNavigate();

  return (
    <div className="arrow-back" onClick={() => navigate(where || -1)}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}
