import React, { useContext } from 'react';
import { RecipeContext } from './App';

export default function SearchBar({ recipes }) {
    const { handleSearchResults } = useContext(RecipeContext)

    function handleSearch(filter) {
        console.log(filter, filter === "")
        if (filter === "") { 
            handleSearchResults([])
            return
        }
        const searchResults = recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()));
        handleSearchResults(searchResults);
    }

    return (
        <div className="searchbar-container">
            <label 
             className="search-label" 
             htmlFor="search">
                 Search
            </label>
            <input 
             className="search-input"
             name="search"
             onChange={e => handleSearch(e.target.value || "")}/>
        </div>
    )
}
