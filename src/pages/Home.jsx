import React, { useEffect, useState } from 'react';
import useNavigate from "@hooks/useNavigate";
import useApi from "@hooks/useApi";

const RecipePost = ({ post }) => {
    return (
        <div className="recipe-post">
            <h2 className="recipe-title">{post.title}</h2>
            <img src={post.image} alt={post.title} className="recipe-image" />
            <p className="recipe-description">{post.description}</p>
            <p className="recipe-content">{post.content}</p>
        </div>
    );
};

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { navigate } = useNavigate();

    const api_dir = import.meta.env.VITE_API_DIR;
    const recipesUrl = `${api_dir}/recipes`;

    const { data: recipeData, loading: recipesLoading, error: recipesError } = useApi(recipesUrl);

    useEffect(() => {
        if (!recipesLoading && !recipesError) {
            if (recipesError === "Token de acceso vencido") {
                console.error("Error al cargar los datos:", recipesError);
                navigate("/login");
            } else {
                setPosts(recipeData);
            }
        }
    }, [recipeData, recipesLoading, recipesError, navigate]);

    return (
        <div>
            {posts.map(post => <RecipePost key={post.id} post={post} />)}
        </div>
    );
};

export default Home;
