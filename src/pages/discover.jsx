import React, {useEffect} from 'react';
import apiClient from '../api/apiClient';


export default function Discover() {
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // What I want to Get
                const response = await apiClient.get('/movie/11');

                // TEST
                console.log(response.data);


            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Discover Page</h1>
            <p>Check the console for movie data.</p>
        </div>
    );
}
