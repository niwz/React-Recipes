import React, { useContext, useState } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App'
import SearchBar from './SearchBar'

export default function RecipeList({ recipes }) {  
    const { handleRecipeAdd } = useContext(RecipeContext)
    const [searchString, setSearchString] = useState("");

    return (
        <div className="recipe-list">
            <SearchBar
              setSearchString={setSearchString} />
            <div>
                {recipes.filter(recipe => recipe.name.toLowerCase().includes(searchString.toLowerCase())).map(recipe => {
                    return <Recipe
                                key={recipe.id}
                                {...recipe}
                                />
                })}
            </div>
            <div className="recipe-list__add-recipe-btn-container">
                <button
                    className="btn btn--primary"
                    onClick={handleRecipeAdd}
                >Add Recipe</button>
            </div>
        </div>
    )
}
