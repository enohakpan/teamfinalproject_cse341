const mongodb = require('../db/mongo');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res, next) => {
  //#swagger.tags = ['other']
  try {
    const result = await mongodb.getDb().db('cse341_personal').collection('other').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while fetching recipes' });
  }
};

const getData = async (req, res) => {
  //#swagger.tags = ['other']
  try {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341_personal').collection('other').find({ _id: id });
    const lists = await result.toArray();
    
    if (!lists || lists.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while fetching recipe' });
  }
};

const createData = async (req, res, next) => {
  //#swagger.tags = ['other']
  try {
    // Data validation
    const { recipeName, ingredients, instructions, nutrition, cookingTime, difficulty, servings, imageUrl } = req.body;
    
    if (!recipeName || !ingredients || !instructions || !nutrition) {
      return res.status(400).json({ error: 'Missing required fields: recipeName, ingredients, instructions, nutrition' });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients must be a non-empty array with objects containing name, amount, and unit' });
    }

    if (!Array.isArray(instructions) || instructions.length === 0) {
      return res.status(400).json({ error: 'Instructions must be a non-empty array of steps' });
    }

    const recipe = {
      recipeName,
      cuisine: 'Other',
      ingredients: ingredients.map(ing => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit
      })),
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      nutrition: {
        calories: nutrition.calories || 0,
        protein: nutrition.protein || 0,
        carbs: nutrition.carbs || 0,
        fat: nutrition.fat || 0,
        fiber: nutrition.fiber || 0
      },
      cookingTime: cookingTime || 0,
      difficulty: difficulty || 'Medium',
      servings: servings || 1,
      imageUrl: imageUrl || '',
      createdAt: new Date()
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('other').insertOne(recipe);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while creating recipe' });
  }
};


const updateData = async (req, res, next) => {
  //#swagger.tags = ['other']
  try {
    // Data validation
    const { recipeName, ingredients, instructions, nutrition, cookingTime, difficulty, servings, imageUrl } = req.body;
    
    if (!recipeName || !ingredients || !instructions || !nutrition) {
      return res.status(400).json({ error: 'Missing required fields: recipeName, ingredients, instructions, nutrition' });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients must be a non-empty array with objects containing name, amount, and unit' });
    }

    if (!Array.isArray(instructions) || instructions.length === 0) {
      return res.status(400).json({ error: 'Instructions must be a non-empty array of steps' });
    }
    
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    const recipe = {
      recipeName,
      cuisine: 'Other',
      ingredients: ingredients.map(ing => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit
      })),
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      nutrition: {
        calories: nutrition.calories || 0,
        protein: nutrition.protein || 0,
        carbs: nutrition.carbs || 0,
        fat: nutrition.fat || 0,
        fiber: nutrition.fiber || 0
      },
      cookingTime: cookingTime || 0,
      difficulty: difficulty || 'Medium',
      servings: servings || 1,
      imageUrl: imageUrl || '',
      updatedAt: new Date()
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('other').replaceOne({ _id: id }, recipe);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Recipe updated successfully' });
    } else if (response.matchedCount === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while updating recipe' });
  }
};
const deleteData = async (req, res, next) => {
  //#swagger.tags = ['other']
  try {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('cse341_personal').collection('other').deleteOne({ _id: id });
    
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while deleting recipe' });
  }
};

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData
};