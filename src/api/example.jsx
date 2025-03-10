import {useEffect, useState} from "react";
import apiClient from "./apiClient.jsx";

const MovieDetails = ({movieId}) => {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await apiClient.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        };

        fetchMovie()
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error : {error.message}</div>;

    return (
        <div>
            <h1>{movie.original_title}</h1>
            <p>{movie.overview}</p>
        </div>
    )
}