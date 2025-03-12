import React, {useEffect, useState} from 'react';
import {motion} from "motion/react";
import {useParams} from 'react-router-dom';
import apiClient from '../api/apiClient';

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null); // État pour stocker le trailer
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [backdropUrl, setBackdropUrl] = useState(null); // État pour stocker l'URL du backdrop

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await apiClient.get(`/movie/${id}`);
                setMovie(response.data);

                // Récupérer les vidéos du film
                const videoResponse = await apiClient.get(`/movie/${id}/videos`);
                const trailers = videoResponse.data.results;

                // Trouver le premier trailer
                const movieTrailer = trailers.find(video => video.type === 'Trailer');
                setTrailer(movieTrailer);

                // Récupérer les images de fond (backdrops)
                const imagesResponse = await apiClient.get(`/movie/${id}/images`);
                const backdrops = imagesResponse.data.backdrops;

                // Prendre le premier backdrop disponible
                if (backdrops.length > 0) {
                    setBackdropUrl(`https://image.tmdb.org/t/p/original/${backdrops[0].file_path}`);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handlePosterClick = () => {
        setIsPlaying(true);
    };

    return (
        <section className="container w-screen mb-[1050px] bg-moviesBg">
            {!isPlaying ? (
                <motion.div
                    className="flex align-middle justify-center items-center w-screen md:h-150 lg:h-180"
                    initial={{
                        scale: 0,
                        opacity: 0,
                        zIndex: 1
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        },
                    }}
                    exit={{opacity: 1}}
                    style={{
                        backgroundImage: `url(${backdropUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '350px',
                    }}

                >

                    <motion.button
                        className="h-50 w-50 bg-white"

                        onClick={handlePosterClick}
                    >

                    </motion.button>
                </motion.div>
            ) : (
                // Afficher le trailer à la place du poster
                <div>
                    <iframe
                        className="w-screen h-80 md:h-150 lg:h-180 min-h-[350px]"
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                        title={`${movie.original_title} trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                    >

                    </iframe>
                </div>
            )}

            <section className="container mx-10 xl:mx-50 mb-[30px] lg:mb-[60px] xl:mb-[300px]">
                <h2 className="text-3xl mb-[16px]">{movie.original_title}</h2>
                <p className="mb-[16px]">{movie.overview}</p>
                <p className="mb-[16px]">Release Date: {movie.release_date}</p>
                <p className="mb-[16px]">Rating: {movie.vote_average}</p>
            </section>
        </section>
    );
};

export default MovieDetails;