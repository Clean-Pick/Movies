import Carousel from "../components/homepage/carousel.jsx";
import {motion} from "motion/react";
import PlayIcon from "../../public/icons/Play.svg"

function Home() {

    return (

        <>
            <section className="w-screen h-auto flex justify-center">

                {/* MOVIE IMAGE HERE */}
                <div
                    className="flex flex-col container
                        w-full
                        h-[200px] md:h-[400px] lg:h-[600px]
                        mx-10 xl:mx-50
                        p-4
                        bg-[url(../public/test/coco.jpg)] bg-cover bg-center
                        rounded-[30px]
                        shadow-lg">

                    <div className="flex-grow"></div>

                    <div
                        className="container flex w-2/3 lg:w-4/10 h-4/10 md:h-3/10 lg:h-2/10 bg-gray-300/30 backdrop-blur-xs rounded-[20px]">

                        <div className="flex w-1/3 justify-center items-center">
                            <motion.img
                                src={PlayIcon}
                                alt="Play Icon"
                                className="w-10 lg:w-20 h-auto cursor-pointer"
                                initial={{scale: 1}}
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.9}}
                            />
                        </div>


                        {/* MOVIE NAME HERE */}
                        <div className="flex flex-wrap w-2/3 justify-center items-center">
                            <p className="w-full h-0 font-thin text-xs text-gray-300">Movie Spotlight</p>
                            <h4 className="w-full font-normal md:text-5xl">Coco</h4>
                        </div>

                    </div>

                </div>

            </section>

            {/* CARROUSEL */}
            <section className="flex flex-wrap bg-moviesBg w-screen px-0 xl:px-50 pb-30 lg:pb-30">
                <h2 className="pt-[32px] pb-[24px] mx-10 xl:mx-0 text-3xl capitalize">trending</h2>

                <Carousel/>
            </section>
        </>
    )
}

//-- Styles --//


export default Home;