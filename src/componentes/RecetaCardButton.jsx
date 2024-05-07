import React from 'react';
import useNavigate from "@hooks/useNavigate";
import '@styles/receta-card-button.css'; 

const RecetaCardButton = ({ title, route, icon }) => { 
  const { navigate } = useNavigate();

  const handleClick = () => {
    let newPath = "/";
    if (route !== "home") {
      newPath = `/admin/${route}Receta`; 
    }
    navigate(newPath);
  };

  return (
    <div className="receta-card" onClick={handleClick}>
      <div className="receta-card-content">
        <div className="receta-card-icon">{icon}</div> {/* Supongamos que icon es un ícono de receta */}
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default RecetaCardButton;
