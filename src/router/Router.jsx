import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Nav from 'Nav';
import Login from 'Login';
import Logout from 'Logout';
import Usuario from 'Usuario';

import CrearPost from 'CrearPost';
import EditarPost from 'EditarPost';
import EliminarPost from 'EliminarPost';

const routes = {

    '/login': {
        component: Login,
        requiresAuth: false
    },
    
    '/logout':{
        component: Logout,
        requiresAuth: false
    },
    '/Usuario':{
        component: Usuario,
        requiresAuth: false
    },
    
    'CrearPost' : {
        component: CrearPost,
        requiresAuth: true
    },

    'EditarPost' : {
        component: EditarPost,
        requiresAuth: true
    },

    'EliminarPost' : {
        component: EliminarPost,
        requiresAuth: true
    }
}

function Router() {
    const history = useHistory();
    const location = useLocation();

    const CurrentPage = routes[location.pathname]?.component || NotFound;

    React.useEffect(() => {
        if (routes[location.pathname]?.requiresAuth && !token) {
            history.push('/login');
        }
    }, [location.pathname, history, token]);

    React.useEffect(() => {
        if (location.pathname === '/logout') {
            localStorage.clear();
            history.replace('/');
        }
    }, [location.pathname, history]);

    return (
        <div>
            <Nav />
            <CurrentPage />
        </div>
    )
}

const NotFound = () => <h1>404 Page not found</h1>;

export default Router;
