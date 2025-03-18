// React/Movies/src/pages/discover.jsx
import MovieList from "../api/movieList.jsx";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Categories from "../components/categories.jsx";

export default function Discover() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="mb-50 mx-10 xl:mx-50 bg-moviesBg">

            <div className="relative flex items-center
            mb-[32px] lg:mb-[40px] xl:mb-[64px]">

                <FontAwesomeIcon
                    icon={faSearch}
                    className="
                        text-gray-400
                        absolute
                        left-5"
                />

                <input
                    type="text"
                    placeholder="Search a movie..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="
                        search-bar
                        flex
                        w-full
                        h-10
                        rounded-[15px]
                        bg-[#211f30]
                        p-5
                        pl-12"
                />
            </div>

            <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>

            <MovieList searchQuery={searchQuery} selectedCategories={selectedCategories}/>
        </div>
    );
}