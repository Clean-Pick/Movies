import {motion} from "motion/react";
import {useNavigate} from "react-router-dom";

export default function MovieCard({movie, index}) {
    const navigate = useNavigate();
    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const handleClick = () => {
        navigate(`/movie/${movie.id}`)
    }

    return (
        <motion.li
            onClick={handleClick}
            className="flex justify-center relative
                w-39 md:w-53 xl:w-70
                h-50 md:h-80 xl:h-100
                bg-white rounded-[30px]
                mb-[30px] lg:mb-[60px] xl:mb-[100px]"
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
            whileTap={{scale: 0.9}}
            whileHover={{
                scale: 1.2,
                boxShadow: "0px 5px 5px #000",
                zIndex: 10
            }}
            style={{
                backgroundImage: `url(${posterUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container flex justify-center items-center absolute
                bottom-[-42px] md:bottom-[-60px] xl:bottom-[-80px]
                w-10/10 h-2/10"
            >
                <p className="capitalize truncate">{movie.title} ({movie.release_date.substring(0, 4)})</p>
            </div>
        </motion.li>
    );
}