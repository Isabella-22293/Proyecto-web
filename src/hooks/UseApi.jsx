import { useState, useEffect } from 'react';

const useApi = (url, options = {}) => { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options); 
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, [url, options]); 

  return { data, loading, error };
};

export default useApi;
