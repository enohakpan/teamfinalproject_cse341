const mongodb = require('../db/mongo');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res, next) => {
  //#swagger.tags = ['Carbrands']
  const result = await mongodb.getDb().db('cse341_personal').collection('carbrands').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getData = async (req, res) => {
  //#swagger.tags = ['Carbrands']
  const id = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cse341_personal').collection('carbrands').find({ _id: id });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createData = async (req, res, next) => {
  //#swagger.tags = ['Carbrands']
  try {
    // Data validation
    const { carModel, productionYear, color, manufacturer, imageUrl } = req.body;
    
    if (!carModel || !productionYear || !color || !manufacturer) {
      return res.status(400).json({ error: 'Missing required fields: carModel, productionYear, color, manufacturer' });
    }
    
    if (typeof productionYear !== 'number' || productionYear < 1900 || productionYear > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Invalid production year' });
    }
    
    const carbrand = {
      model: carModel,
      productionYear,
      color,
      manufacturer,
      imageUrl: imageUrl || ''
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('carbrands').insertOne(carbrand);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create carbrand' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while creating carbrand' });
  }
};


const updateData = async (req, res, next) => {
  //#swagger.tags = ['Carbrands']
  try {
    // Data validation
    const { carModel, productionYear, color, manufacturer, imageUrl } = req.body;
    
    if (!carModel || !productionYear || !color || !manufacturer) {
      return res.status(400).json({ error: 'Missing required fields: carModel, productionYear, color, manufacturer' });
    }
    
    if (typeof productionYear !== 'number' || productionYear < 1900 || productionYear > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Invalid production year' });
    }
    
    const id = new ObjectId(req.params.id);
    const carbrand = {
      model: carModel,
      productionYear,
      color,
      manufacturer,
      imageUrl: imageUrl || ''
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('carbrands').replaceOne({ _id: id }, carbrand);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'Failed to update carbrand' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while updating carbrand' });
  }
};

const deleteData = async (req, res, next) => {
  //#swagger.tags = ['Carbrands']
  const id = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('cse341_personal').collection('carbrands').deleteOne({ _id: id });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData
};