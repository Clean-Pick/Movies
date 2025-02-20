import './App.css'
import Header from "./components/header.jsx";

function App() {

    return (

        <section className="font-movies-lato w-screen h-screen bg-moviesBg">

            <Header/>

            <section className="w-screen h-screen flex justify-center">

                <div
                    className="flex container w-full h-[200px] mx-[30px] p-4 bg-white rounded-[30px] shadow-lg ">

                    <div className="relative bottom-0 container w-2/3 h-4/10 bg-gray-300 rounded-[20px]"></div>

                </div>

            </section>
        </section>
    )
}

export default App
