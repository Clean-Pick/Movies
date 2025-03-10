// src/components/MovieDetails.jsx
import React, {useEffect, useState} from 'react';
import apiClient from '../api/apiClient';

const MovieDetails = ({movieId}) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await apiClient.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2 className="text-3xl mb-[16px]">{movie.original_title}</h2>
            <p className="mb-[16px]">{movie.overview}</p>
            <p className="mb-[16px]">Release Date: {movie.release_date}</p>
            <p className="mb-[16px]">Rating: {movie.vote_average}</p>
        </div>
    );
};

export default MovieDetails;