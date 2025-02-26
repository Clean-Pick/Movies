import './App.css'
import Header from "./components/header.jsx";
import Home from "./pages/home.jsx";

function App() {
    return (
        <section className="font-movies-lato w-screen h-screen bg-moviesBg">
            <Header/>
            <Home/>

        </section>
    )
}

export default App