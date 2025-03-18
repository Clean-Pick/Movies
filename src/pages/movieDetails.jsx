// file: React/Movies/src/pages/movieDetails.jsx
import React, {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStar} from '@fortawesome/free-solid-svg-icons';
import {faClock as faClockRegular} from '@fortawesome/free-regular-svg-icons';
import {useParams} from 'react-router-dom';
import apiClient from '../api/apiClient.jsx';
import MovieCard from '../components/discover/movieCard.jsx';
import LoadingScreen from '../components/loadingScreen.jsx';
import VideoPlayer from '../components/movieDetails/videoPlayer.jsx';

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [backdropUrl, setBackdropUrl] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await apiClient.get(`/movie/${id}`);
                setMovie(response.data);

                const videoResponse = await apiClient.get(`/movie/${id}/videos`);
                const trailers = videoResponse.data.results;
                const movieTrailer = trailers.find((video) => video.type === 'Trailer');
                setTrailer(movieTrailer);

                const imagesResponse = await apiClient.get(`/movie/${id}/images`);
                const backdrops = imagesResponse.data.backdrops;

                if (backdrops.length > 0) {
                    setBackdropUrl(`https://image.tmdb.org/t/p/original/${backdrops[0].file_path}`);
                }

                const recommendationsResponse = await apiClient.get(`/movie/${id}/recommendations`);
                setRecommendations(recommendationsResponse.data.results);

            } catch (error) {

                setError(error);

            } finally {

                setLoading(false);
                setIsPlaying(false);
                document.body.classList.add('loaded');

            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <LoadingScreen/>;
    if (error) return <div>Error: {error.message}</div>;

    const handlePosterClick = () => {
        setIsPlaying(true);
    };

    return (
        <section className="w-screen mb-[30px] lg:mb-[60px] xl:mb-[150px] bg-moviesBg overflow-hidden">
            {!isPlaying ? (
                <motion.div
                    className="flex align-middle justify-center items-center w-full md:h-150 lg:h-180"
                    initial={{opacity: 0, zIndex: 1}}
                    animate={{opacity: 1}}
                    exit={{opacity: 1}}
                    style={{
                        backgroundImage: `url(${backdropUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '350px'
                    }}
                >
                    <motion.button
                        aria-label="play button"
                        className="flex justify-center items-center h-16 md:h-20 lg:h-24 2xl:h-32 w-16 md:w-20 lg:w-24 2xl:w-32 bg-transparent border backdrop-filter backdrop-blur-md rounded-full"
                        onClick={handlePosterClick}
                        initial={{scale: 0, opacity: 0, zIndex: 1}}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            x: 0,
                            transition: {type: 'spring', stiffness: 300, damping: 20}
                        }}
                        exit={{opacity: 1}}
                        whileTap={{scale: 0.9}}
                        whileHover={{scale: 1.2, boxShadow: '0px 5px 5px #000', zIndex: 10}}
                        style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}
                    >
                        <FontAwesomeIcon icon={faPlay} className="text-3xl md:text-5xl xl:text-6xl"/>
                    </motion.button>
                </motion.div>

            ) : (
                trailer ? (
                    <VideoPlayer video={trailer}/>
                ) : (
                    // Display backdrop with error overlay when no trailer is available
                    <div
                        className="w-full md:h-150 lg:h-180 min-h-[350px] relative"
                        style={{
                            backgroundImage: `url(${backdropUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 flex justify-center items-center bg-black/50">
                            <p className="text-white text-xl">No trailer available for this movie.</p>
                        </div>
                    </div>
                )
            )}
            <section className="mx-10 xl:mx-50 mb-[30px] lg:mb-[150px] xl:mb-[300px] mt-[24px]">
                <div>
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-[16px]">{movie.title}</h1>
                    <div className="flex gap-5 mb-[16px]">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faClockRegular} className="mr-2"/>
                            <p>{movie.runtime} minutes</p>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faStar} className="mr-2"/>
                            <p>{movie.vote_average} (IMDb)</p>
                        </div>
                    </div>
                </div>
                <hr className="mb-[16px] w-full opacity-10"/>
                <section className="flex gap-10 mb-[16px]">
                    <div className="w-1/2">
                        <h2 className="mb-[16px] text-2xl">Release Date</h2>
                        <p className="mb-[16px]">
                            {new Date(movie.release_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2 className="mb-[16px] text-2xl">Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <p
                                    key={genre.id}
                                    className="bg-[#201f27] p-1.5 rounded-xl text-sm border-t-1 border-l-1 border-b-0 border-r-0 border-[#504f56] border-opacity-100 border-t-[#504f56] border-l-[#504f56] border-b-transparent border-r-transparent"
                                >
                                    {genre.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>
                <hr className="mb-[16px] w-full opacity-10"/>
                <section className="mb-[16px] md:mb-[16px] h-auto">
                    <h2 className="mb-[16px] text-2xl">Synopsis</h2>
                    <p>{movie.overview}</p>
                </section>
                <hr className="mb-[16px] w-full opacity-10"/>
                <section className="mb-[160px] md:mb-[16px] h-auto">

                    <h2 className="mb-[16px] text-2xl">Recommended Movies</h2>

                    <ul className="flex flex-wrap gap-4">


                        {recommendations.length === 0 ? (
                            <div className="flex justify-center items-center
                            w-full
                            h-20
                            mt-10 xl:mt-30
                            mb-25 xs:mb-0">
                                <p className="text-md">No recommendations available for this movie.</p>
                            </div>
                        ) : (
                            recommendations.map((recommendation, index) => (
                                <MovieCard key={recommendation.id} movie={recommendation} index={index}/>
                            ))
                        )}

                    </ul>
                </section>
            </section>
        </section>
    );
};

export default MovieDetails;