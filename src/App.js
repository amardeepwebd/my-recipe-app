import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const RecipeSearch = () => {
    const [recipeName, setRecipeName] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 3;

    const searchRecipesByName = async () => {
        try {
            const apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=d7a5803fd03d49a697d8d325ddea284d&query=${recipeName}&number=${recipesPerPage * 2}`;
            const response = await axios.get(apiUrl);
            setRecipes(response.data.results || []);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="recipe-search-container">
            <h1>Recipe Search by Name</h1>
            <label htmlFor="recipeName">Enter Recipe Name:</label>
            <div className="input-container">
                <input
                    type="text"
                    id="recipeName"
                    placeholder="Enter Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <button onClick={searchRecipesByName}>Search</button>
            </div>

            {currentRecipes.length > 0 && (
                <div>
                    <h2>Search Results:</h2>
                    {currentRecipes.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            <h3>{recipe.title}</h3>
                            <p className="recipe-ingredients">Ingredients: {recipe.missedIngredients ? recipe.missedIngredients.map(ingredient => ingredient.originalString).join(', ') : 'N/A'}</p>
                            <p className="recipe-instructions">Instructions: {recipe.instructions}</p>
                            <p className="recipe-link">Link: <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{recipe.sourceUrl}</a></p>
                        </div>
                    ))}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSearch;