import React, { useState } from 'react'
import RecipeList from './RecipeList'
import '../css/app.css'
import uuidv4 from 'uuid/v4'

export const ThemeContext = React.createContext()

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

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

  return <RecipeList 
    recipes={recipes}
    handleRecipeAdd={handleRecipeAdd}
    handleRecipeDelete={handleRecipeDelete}
    />
}

const sampleRecipes = [{
  id: 1,
  name: 'Plain Chicken',
  servings: 3,
  cookTime: '1:45',
  instructions: "1. Add salt to chicken.\n2. Put chicken in oven.\n3. Eat chicken.",
  ingredients: [{
    name: 'Chicken',
    amount: '2 lbs'
  },
  {
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
    name: 'Pork',
    amount: '3 lbs'
  },
  {
    name: 'Paprika',
    amount: '2 tbs'
  }]
}]

export default App;
