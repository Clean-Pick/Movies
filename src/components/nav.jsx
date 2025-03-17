import {Route, Routes} from 'react-router-dom';
import Home from '../pages/home.jsx';
import Discover from '../pages/discover.jsx';
import MovieDetails from '../pages/movieDetails.jsx';
import Profile from '../pages/profile.jsx';

export default function Nav() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/discover" element={<Discover/>}/>
            <Route path="/movie/:id" element={<MovieDetails/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    );
}