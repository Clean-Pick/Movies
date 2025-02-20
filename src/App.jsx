import './App.css'
import Header from "./components/header.jsx";

function App() {
    return (
        <section className="font-movies-lato w-screen h-screen bg-moviesBg">
            <Header/>

            <section className="w-screen h-screen flex justify-center">

                {/* MOVIE IMAGE HERE */}
                <div
                    className="flex flex-col container w-full h-[200px] md:h-[400px] lg:h-[600px] mx-[30px] p-4 bg-[url(../public/test/coco.jpg)] bg-cover bg-center rounded-[30px] shadow-lg">

                    <div className="flex-grow"></div>

                    <div
                        className="container flex w-2/3 lg:w-4/10 h-4/10 md:h-3/10 lg:h-2/10 bg-gray-300/30 backdrop-blur-xs rounded-[20px]">

                        <div className="flex w-1/3 justify-center items-center">
                            <img src="../public/icons/Play.svg" alt="play icon" className="w-4/10 h-auto"/>
                        </div>


                        {/* MOVIE NAME HERE */}
                        <div className="flex flex-wrap w-2/3 justify-center items-center">
                            <p className="w-full h-0 font-thin text-xs text-gray-300">Movie Spotlight</p>
                            <h2 className="w-full font-normal md:text-5xl">Coco</h2>
                        </div>

                    </div>

                </div>

            </section>
        </section>
    )
}

export default App