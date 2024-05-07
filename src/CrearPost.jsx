import React, { useState } from 'react';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tipo, setTipo] = useState('');
    const [preparacion, setPreparacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    tipo,
                    preparacion,
                    descripcion,
                    ingredientes,
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error('Error al crear el post');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Crear Post</h2>
            {error && <div>Error: {error}</div>}
            {success && <div>¡El post ha sido creado con éxito!</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Contenido:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                </div>
                <div>
                    <label>Preparación:</label>
                    <input type="text" value={preparacion} onChange={(e) => setPreparacion(e.target.value)} />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div>
                    <label>Ingredientes:</label>
                    <textarea value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>Crear Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
