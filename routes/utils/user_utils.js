const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into Users_Favorites (user_id, recipe_id) values
     ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from Users_Favorites
     where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsWatched(user_id, recipe_id, timestamp){
    await DButils.execQuery(
        `INSERT INTO User_Recipe_History (user_id, recipe_id, timestamp)
         VALUES (${user_id}, ${recipe_id}, '${timestamp}')`
      );
}

async function getLastWatched(user_id){
    // Retrieve the recipe history for the user from the User_Recipe_History table
    const recipeHistory = await DButils.execQuery(
       `SELECT recipe_id
        FROM User_Recipe_History
        WHERE user_id = ${user_id}
        ORDER BY timestamp DESC
        LIMIT 3`
      );
    return recipeHistory;

}

async function markAsCreated(user_id, title, readyInMinutes,
    image, popularity, vegan, vegetarian,
    glutenFree, instruction, ingredients,
    servings){


    // Insert the recipe into the Personal_Recipes table
    await DButils.execQuery(`INSERT INTO Personal_Recipes
        (user_id, title, readyInMinutes,
        image, popularity, vegan, vegetarian, glutenFree,
        instruction, ingredients, servings)
        VALUES (${user_id}, '${title}', ${readyInMinutes},
        '${image}', ${popularity}, ${vegan}, ${vegetarian},
        ${glutenFree}, '${JSON.stringify(instruction)}',
        '${JSON.stringify(ingredients)}', ${servings})`);
    
}   

async function getCreatedRecipes(user_id) {
    // Retrieve the recipes created by the user from the Personal_Recipes table
    const createdRecipes = await DButils.execQuery(
      `SELECT *
       FROM Personal_Recipes
       WHERE user_id = ${user_id}`
    );
    return createdRecipes;
}
  
async function markAsFamilyRecipe(user_id, recipe_name, owner_name, special_time, ingredients, instructions, picture){
    await DButils.execQuery(`
      INSERT INTO Family_Recipes (user_id, recipe_name, owner_name, special_time, ingredients, instructions, picture)
      VALUES (${user_id}, '${recipe_name}', '${owner_name}', '${special_time}', '${ingredients}', '${instructions}', '${picture}')
    `);
}

async function getFamilyRecipes(user_id){
    return await DButils.execQuery(`
      SELECT *
      FROM Family_Recipes
      WHERE user_id = ${user_id}
    `);
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsWatched = markAsWatched;
exports.getLastWatched = getLastWatched;
exports.markAsCreated =markAsCreated;
exports.getCreatedRecipes = getCreatedRecipes;
exports.markAsFamilyRecipe =markAsFamilyRecipe;
exports.getFamilyRecipes = getFamilyRecipes;
