import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Nav from "./components/nav.jsx";


function App() {
    return (
        <section className="font-movies-lato w-screen h-screen bg-moviesBg">
            <Router>
                <Header/>
                <Nav/>
                <Footer/>
            </Router>
        </section>
    )
}

export default App