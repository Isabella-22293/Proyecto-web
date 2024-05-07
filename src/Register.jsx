import { useState } from 'react';
import UseNav from '@hooks/UseNav';
import '../styles/forms.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setError('Ingrese los datos solicitados');
        } else {
            setError('');

            try {
                const response = await fetch('URL_DEL_BACKEND/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                if (response.ok) {
                    console.log('Usuario registrado correctamente.');
                } else {
                    setError('Error al registrar al usuario. Por favor, inténtalo de nuevo.');
                }
            } catch (error) {
                console.error('Error al registrar al usuario:', error);
                setError('Error al intentar registrar al usuario. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registrarse</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
