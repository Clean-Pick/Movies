// src/api/movieList.jsx
import React, {useEffect, useState} from "react";
import apiClient from "./apiClient.jsx";
import MovieCard from "../components/discover/movieCard.jsx";
import LoadingScreen from "../components/loadingScreen.jsx";
import ErrorBoundary from "../components/errorBoundary.jsx";

const MovieList = ({searchQuery, selectedCategories}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [searchQuery, selectedCategories]);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const endpoint = searchQuery ? "/search/movie" : "/discover/movie";
                const params = {
                    page,
                    ...(searchQuery ? {query: searchQuery} : {}),
                    ...(selectedCategories.length > 0 ? {with_genres: selectedCategories.join(',')} : {})
                };
                const response = await apiClient.get(endpoint, {params});
                const newMovies = response.data.results;
                setMovies(prevMovies => (
                    searchQuery || selectedCategories.length > 0 ? newMovies : [...prevMovies, ...newMovies]
                ));
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page, searchQuery, selectedCategories]);

    useEffect(() => {
        const handleScroll = () => {
            if (!loading && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    if (loading && movies.length === 0) return <LoadingScreen/>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="bg-moviesBg">
            <ul className="flex flex-wrap mt-[24px] justify-between">
                <ErrorBoundary>
                    {movies.length === 0 ? (
                        <div className="w-full text-center text-lg p-4 mt-40">
                            <p>No movies found for the selected categories.</p>
                        </div>
                    ) : (
                        movies.map((movie, index) => (
                            <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index}/>
                        ))
                    )}
                </ErrorBoundary>
            </ul>
            {loading && <div className="text-2xl"><LoadingScreen/></div>}
        </section>
    );
};

export default MovieList;