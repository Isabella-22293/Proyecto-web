import React, { useState } from 'react';
import useAPI from './useAPI'; 

function ObtenerRecetas() {
    const [mostrarRecetas, setMostrarRecetas] = useState(false);
    const [recetas, setRecetas] = useState([]);
    const { obtenerRecetas } = useAPI(); 

    const handleClick = async () => {
        try {
            const response = await obtenerRecetas();
            setRecetas(response.data);
            setMostrarRecetas(true);
        } catch (error) {
            console.error('Error al obtener las recetas:', error);
        }
    };

    const handleContraer = () => {
        setMostrarRecetas(false);
    };

    return (
        <div>
            <button onClick={handleClick}>Obtener Recetas</button>
            {mostrarRecetas && (
                <>
                    <ul>
                        {recetas.map((receta, index) => (
                            <li key={index}>
                                <h3>{receta.titulo}</h3>
                                <p>{receta.descripcion}</p>
                                <img src={receta.imagen} alt={receta.titulo} />
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleContraer}>Contraer</button>
                </>
            )}
        </div>
    );
}

export default ObtenerRecetas;
