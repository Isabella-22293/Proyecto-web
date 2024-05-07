import React from 'react';
import useApi from '@hooks/useApi';

import "@styles/receta-acciones.css"; 

function AccionesReceta({ recetaId }) { 
    const api_dir = import.meta.env.VITE_API_DIR;
    const accionesUrl = `${api_dir}/acciones/receta/${recetaId}`;
    
    const { data, loading, error } = useApi(accionesUrl);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <button>Obtener Acciones</button>;
    }

    const acciones = data;

    return (
        <div className="container-acciones">
            <div className="acciones-receta">
                {acciones.map((accion, index) => (
                    <div key={index}>
                        {accion.descripcion} - {accion.autor} ({accion.fecha})
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccionesReceta;
