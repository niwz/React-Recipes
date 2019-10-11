import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import uuidv4 from 'uuid/v4'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [currentRecipes, setCurrentRecipes] = useState(recipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) {
      const storedRecipes = JSON.parse(recipeJSON)
      setRecipes(storedRecipes)
      setCurrentRecipes(storedRecipes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValues = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleSearchResults
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: '',
      cookTime: '',
      instructions: '',
      ingredients: []
    }
    setRecipes([...recipes, newRecipe])
    setCurrentRecipes([...currentRecipes, newRecipe])
  };

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
    setCurrentRecipes(currentRecipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const recipeIndex = newRecipes.findIndex(recipe => recipe.id === id)
    newRecipes[recipeIndex] = recipe
    setRecipes(newRecipes)

    const newCurrentRecipes = [...currentRecipes]
    const currentRecipeIndex = newCurrentRecipes.findIndex(recipe => recipe.id === id)
    newCurrentRecipes[currentRecipeIndex] = recipe
    setCurrentRecipes(newCurrentRecipes)
  }

  function handleSearchResults(searchResults) {
    setCurrentRecipes(searchResults.length > 0 ? searchResults : recipes)
  }

  return(  
    <RecipeContext.Provider value={recipeContextValues}>
      <RecipeList 
        recipes={currentRecipes}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [{
  id: 1,
  name: 'Plain Chicken',
  servings: 3,
  cookTime: '1:45',
  instructions: "1. Add salt to chicken.\n2. Put chicken in oven.\n3. Eat chicken.",
  ingredients: [{
    id: 1,
    name: 'Chicken',
    amount: '2 lbs'
  },
  {
    id: 2,
    name: 'Salt',
    amount: '1 tbs'
  }]
},
{
  id: 2,
  name: 'Plain Pork',
  servings: 5,
  cookTime: '0:45',
  instructions: "1. Add paprika to pork.\n2. Put pork in oven.\n3. Eat pork.",
  ingredients: [{
    id: 1,
    name: 'Pork',
    amount: '3 lbs'
  },
  {
    id: 2,
    name: 'Paprika',
    amount: '2 tbs'
  }]
}]

export default App;
