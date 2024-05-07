import React, { useState, useEffect } from 'react';

const DeletePost = ({ postId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'DELETE',
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error('Error al eliminar el post');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Eliminando el post...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (success) {
        return <div>El post ha sido eliminado</div>;
    }

    return (
        <div>
            <h2>Eliminar Post</h2>
            <p>¿Estás seguro de que deseas eliminar este post?</p>
            <button onClick={handleDelete} disabled={loading}>Eliminar</button>
        </div>
    );
};

export default DeletePost;
