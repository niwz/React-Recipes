import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import uuidv4 from 'uuid/v4'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValues = {
    handleRecipeAdd,
    handleRecipeDelete
  }
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instructions',
      ingredients: [
        {
          id: uuidv4(),
          name: 'Name',
          amount: '1 Tbs',
        }
      ]
    }
    setRecipes([...recipes, newRecipe])
  };

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return(
    <RecipeContext.Provider value={recipeContextValues}>
      <RecipeList 
        recipes={recipes}
      />
      <RecipeEdit />
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
