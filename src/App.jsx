import './App.css';
import {BrowserRouter as Router, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Nav from "./components/nav.jsx";

function App() {
    const location = useLocation();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // 1024px correspond à lg

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Affiche le Header uniquement si l'écran est large et que l'URL commence par '/movie/'
    const showHeader = isLargeScreen && location.pathname.startsWith('/movie/');

    return (
        <section className="font-movies-lato w-screen h-screen bg-moviesBg">
            {showHeader && <Header/>}
            <Nav/>
            <Footer/>
        </section>
    );
}

const AppWrapper = () => (
    <Router>
        <App/>
    </Router>
);

export default AppWrapper;