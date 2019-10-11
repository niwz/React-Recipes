import React from 'react'

export default function RecipeIngredientEdit(props) {
    const {
        ingredient,
        handleIngredientChange,
        handleIngredientDelete
    } = props

    function handleChange(changes) {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
    }

    return (
        <>
            <input 
                type="text" 
                className="recipe-edit__input"
                value={ingredient.name}
                onChange={i => handleChange({ name: i.target.value })}
            />
            <input
                type="text"
                className="recipe-edit__input"
                value={ingredient.amount}
                onChange={i => handleChange({ amount: i.target.value })}/>

            <button
                className="btn btn--danger"
                onClick={() => handleIngredientDelete(ingredient.id)}>
                &times;
            </button>
        </>
    )
}

