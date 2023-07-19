var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");


router.get("/random", async (req, res) => {
  try {
    const recipes = await recipes_utils.getAllRecapiesss();
    console.log(recipes)
    res.send(recipes);//send to client all recipes
  } catch (error) {
    res.send(error)
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a details of a recipe by its query
 */
router.post("/search", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeBySearch(req.body.search,
      parseInt(req.body.limit), req.body.cuisine, req.body.diet, req.body.intolerance);
    
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});
/**
 * This path returns a recipe's likes by its id
 */
router.get("/recipe-popularity/:id", async (req, res, next) => {
  try {
    const recipePopularity = await recipes_utils.getRecipePopularity(req.params.id);
    console.log("recipePopularity -> " + recipePopularity)
    res.send(recipePopularity.toString());
  } catch (error) {
    next(error);
  }
});


module.exports = router;
