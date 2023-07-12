var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");
const { DateTime } = require("mssql");


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;

    await user_utils.markAsFavorite(user_id, recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    // let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    //result = array of favorites recipes
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path gets body with recipeId and save this recipe in the User_Recipe_History table of the logged-in user
 */
router.post('/last_seen', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    const timestamp = new Date().getTime(); // Get the current timestamp
    // Insert the record into the User_Recipe_History table
    await user_utils.markAsWatched(user_id, recipe_id, timestamp);
    res.status(200).send("The Recipe successfully saved as watched");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the three last watched recipes that were saved by the logged-in user
 */
router.get('/last_seen', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getLastWatched(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path gets body with recipeId and save this recipe in the Personal_Recipes table of the logged-in user
 */
router.post('/recipes_created', async (req, res, next) => {
  try{
    
    const user_id = req.session.user_id;
    const {title, readyInMinutes,
          image, popularity, vegan, vegetarian,
          glutenFree, instruction, ingredients,
          servings } = req.body;

    await user_utils.markAsCreated(user_id, title, readyInMinutes,
      image, popularity, vegan, vegetarian,
      glutenFree, instruction, ingredients,
      servings);
    res.status(200).send({ message: 'Recipe created successfully', success: true });
  
  } catch (error) {
    next(error);
  }
});

router.get('/recipes_created', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await user_utils.getCreatedRecipes(user_id);
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
});


router.post('/family-recipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const {recipe_name, owner_name, special_time, ingredients, instructions, picture } = req.body;

    // Insert the recipe into the Family_Recipes table
    await user_utils.markAsFamilyRecipe(user_id, recipe_name, owner_name, special_time, ingredients, instructions, picture);
    res.status(200).send({ message: 'Family recipe saved successfully', success: true });
  } catch (error) {
    next(error);
  }
});

router.get('/family-recipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    // Retrieve the family recipes for the logged-in user from the Family_Recipes table
    const familyRecipes = await user_utils.getFamilyRecipes(user_id);
    res.status(200).send(familyRecipes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
