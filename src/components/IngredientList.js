import React from 'react'
import Ingredient from './Ingredient'

export default function IngredientList({ ingredients }) {
    return (
        <div className="ingredient-grid">
            {ingredients.map(ingredient => {
                return <Ingredient 
                key={ingredients.id}
                {...ingredient} />
            })}
        </div>
    )
}
