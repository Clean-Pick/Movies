import './App.css';
import {BrowserRouter as Router, useLocation} from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Nav from "./components/nav.jsx";

function App() {
    const location = useLocation();
    const showHeader = !location.pathname.startsWith('/movie/');

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