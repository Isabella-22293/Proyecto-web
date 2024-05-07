import React, { useState, useEffect } from 'react';

const EditPost = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tipo, setTipo] = useState('');
    const [preparacion, setPreparacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ingredientes, setIngredientes] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/posts');
                if (response.ok) {
                    const postData = await response.json();
                    setPost(postData);
                    setTitle(postData.title);
                    setContent(postData.content);
                    setTipo(postData.tipo);
                    setPreparacion(postData.preparacion);
                    setDescripcion(postData.descripcion);
                    setIngredientes(postData.ingredientes);
                } else {
                    throw new Error('Error al cargar el post');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'PUT',
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
                throw new Error('Error al editar el post');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>No se encontró el post.</div>;
    }

    return (
        <div>
            <h2>Editar Post</h2>
            {success && <div>¡El post ha sido editado con éxito!</div>}
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
                <button type="submit" disabled={loading}>Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditPost;
