import React, { useEffect, useState } from 'react';
import '../home.css'
import useNav from "useNav"

const PostList = () => {
    if (loading) {
        return <Loading />;
    }

    if (posts.length === 0) {
        return <h3>No hay posts disponibles.</h3>;
    }

    return (
        <div className="post-list">
        {posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
        </div>
    );
    };
    
    const API = async () => {
        const data = await fetch("http://localhost:3000/posts");
        const dataJson = await data.json();
        console.log(dataJson);
        return dataJson;
    };

        const { useState, useEffect } = React;

        const AsyncComponent = React.lazy(() => import('./AsyncComponent'));
        function App() {
            const [posts, setPosts] = useState([]);
            const [loading, setLoading] = useState(true);

            const App = () => {
                return (
                    <React.Suspense fallback={<h3>Cargando...</h3>}>
                    <AsyncComponent />
                    </React.Suspense>
                )
                }
            useEffect(() => {
                API().then(data => {
                    setPosts(data);
                    setLoading(false);
                }).catch(error => {
                    console.error('Error:', error);
                    setLoading(false);
                });
            }, []);

            const Post = ({ post }) => {
                return (
                    <div className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p><strong>Tipo:</strong> {post.Tipo}</p>
                        <p><strong>Preparación:</strong> {post.Preparacion}</p>
                        <p><strong>Descripción:</strong> {post.Descripcion}</p>
                        <p><strong>Ingredientes:</strong> {post.Ingredientes}</p>
                        <p><strong>created_at:</strong> {post.created_at}</p>
                    </div>
                );
            };            

            const Loading = () => {
                return <h3>Cargando...</h3>;
            };

            const PostList = () => {
                if (loading) {
                    return <Loading />;
                }

                if (posts.length === 0) {
                    return <h3>No hay posts disponibles.</h3>;
                }

                return (
                    <div className="post-list">
                        {posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                );
            };

            return (
                <div>
                    {posts.map(post => <Post key={post.id} post={post}/>)}
                </div>
            );
        };
export default Inicio