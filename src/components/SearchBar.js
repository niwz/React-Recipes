import React from 'react';

export default function SearchBar({ setSearchString }) {

    function handleSearch(searchString) {
        setSearchString(searchString)
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
