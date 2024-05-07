import React, { useState, useEffect } from 'react';
import useToken from "@hooks/useToken";
import useNavigate from "@hooks/useNavigate";
import logo from "@assets/logo.png"; 
import "../styles/receta-nav.css"; 

const Nav = () => {
    const { isLoggedIn, token } = useToken();
    const { navigate } = useNavigate();
    
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let decodedToken = {};
    if (isLoggedIn) {
        decodedToken = parseToken(token);
    }

    return (
        <nav className={scrolled ? 'receta-nav-container scrolled' : 'receta-nav-container'}>
            <a href="/">
                <center><img src={logo} alt="Logo" className="logo" /></center>
            </a>
            <a href="#/" onClick={() => navigate('/')}>Inicio</a>
            <a href="#/recetas" onClick={() => navigate('/recetas')}>Recetas</a> {/* Supongamos que '/recetas' es la ruta para ver todas las recetas */}
            {
                isLoggedIn ? (
                    <>
                    <a href="#/admin" onClick={() => navigate('/admin')}>Administrar</a>
                    <a href="#/logout" onClick={() => navigate('/logout')}>Cerrar Sesión</a>
                    <a href="#/perfil" onClick={() => navigate('/perfil')}>Mi Perfil</a>
                    </>
                ) : (
                    <>
                    <a href="#/login" onClick={() => navigate('/login')}>Iniciar Sesión</a>
                    <a href="#/registro" onClick={() => navigate('/registro')}>Registrarse</a>
                    </>
                )
            }
        </nav>
    );
};

export default Nav;
