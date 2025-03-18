// src/components/Categories.jsx
import React from 'react';

const categoriesList = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 27, name: 'Horror'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'},
];

const Categories = ({selectedCategories, setSelectedCategories}) => {
    const toggleCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };
    
    return (
        <div className=" w-full
            overflow-x-scroll lg:overflow-x-auto
            whitespace-nowrap xl:whitespace-normal
            mb-10">
            <div className="flex flex-nowrap
            gap-3 md:gap-5 lg:gap-2 xl:gap-2 2xl:gap-2
            ">
                {categoriesList.map(category => (
                    <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`p-1.5
                        rounded-xl text-sm 
                        transition-colors duration-200 ${selectedCategories.includes(category.id) ? ' text-orange-500 border-b-1 border-orange-500' : 'text-white'}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;