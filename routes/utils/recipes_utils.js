const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */
//, cuisine, diet, intolerance

async function getAllRecapiesss() {
    let recapies = await axios.get(`${api_domain}/random`, {
        params: {
            limitLicense: true ,
            // includeNutrition: false,
            apiKey: process.env.spooncular_apiKey ,
            number : 1
        }
    });
    let info = []
    for (const recipe_info of recapies.data.recipes) {
        const recipeDetails = await getBasicRecipeDetails(recipe_info.id)
        info.push(recipeDetails)
    }
    // const info = getRecipesPreview(recapies.data.recipes)
    // console.log(recapies.data.recipes.length)
    return info
    // return recapies.data.recipes
   
}

async function getAllRecapies() {
    let recapies = await axios.get(`${api_domain}/${recipe_id}/random`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey ,
            number : 3
        }
    });
    const info = extractPreviewRecipeDetails(recapies.data.recipes)
    // console.log(recapies.data.recipes.length)
    return info
   
}

async function getRecipeBySearch(searchResult , limit, cuisine, diet, intolerance){
    let info = [];
    if(!limit){
        limit = 5;
    }
    let recapies = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey ,
            number: limit,
            query : searchResult,
            cuisine : cuisine,
            diet : diet,
            intolerance : intolerance

        }
    });
    for (const recipe_info of recapies.data.results) {
        const recipeDetails = await getBasicRecipeDetails(recipe_info.id)
        info.push(recipeDetails)
    }
    
    return info
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    let instruction = await getInstruction(recipe_id);
    let ingredientsAndAmount = await getIngredientsAndAmountByID(recipe_id);
    let servings = await getServings(recipe_id);

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        instruction : instruction,
        ingredients : ingredientsAndAmount,
        servings : servings
        
    }
}

async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getInstruction(recipe_id) {
    let instructionToReturn = []
    let instruction = await axios.get(`${api_domain}/${recipe_id}/analyzedInstructions`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey,

        }
    });
    console.log(instruction.data)
    if (instruction.data && instruction.data.length > 0 && instruction.data[0].steps) {
    for (const step of instruction.data[0].steps) {
        const numberOfStep = step.number;
        const textOfInstru = step.step;
        const compliteInstru = numberOfStep + ". " + textOfInstru;
        instructionToReturn.push(compliteInstru);
    
        }
    }
    return instructionToReturn
    }

async function getIngredientsAndAmountByID(recipe_id) {
    let IngredientsAndAmount = await axios.get(`${api_domain}/${recipe_id}/ingredientWidget.json`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
    let unitValueAndName = [];
    for (const ingredient of IngredientsAndAmount.data.ingredients) {
        const unit = ingredient.amount.metric.unit;
        const value = ingredient.amount.metric.value;
        const name = ingredient.name;
        const ingredientInfo = `${value} ${unit} ${name}`;
        unitValueAndName.push(ingredientInfo);
    }
    return unitValueAndName;
}
        
async function getServings(recipe_id) {
    let info = await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });

    return info.data.servings;
}

async function getRecipesPreview(recipes_id_array){
    let recipes =[];
    for (const recipe_id of recipes_id_array) {
        const info = await getBasicRecipeDetails(recipe_id);
        recipes.push(info);
    }

    return recipes;
}

async function getBasicRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
    }
}
  
async function getRecipePopularity(recipe_id){
    console.log(recipe_id)
    const recipe_info = await getRecipeInformation(recipe_id)
    // console.log("recipe_info.data.aggregateLikes -> " + recipe_info.data.aggregateLikes)
    return recipe_info.data.aggregateLikes;
}

exports.getRecipeDetails = getRecipeDetails;
exports.getAllRecapies = getAllRecapies;
exports.getRecipeBySearch = getRecipeBySearch;
exports.getRecipePopularity = getRecipePopularity;
exports.getRecipesPreview = getRecipesPreview;
exports.getAllRecapiesss = getAllRecapiesss;
