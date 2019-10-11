import React from 'react'

export default function SearchBar(props) {
    const { recipes, setFilteredRecipes } = props

    function handleSearch(filter) {
        if (filter === "" || recipes === []) setFilteredRecipes(recipes)
        const searchResults = recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()));
        setFilteredRecipes(searchResults);
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
