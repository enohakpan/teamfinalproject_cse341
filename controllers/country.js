const mongodb = require('../db/mongo');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res, next) => {
  //#swagger.tags = ['Country']
  const result = await mongodb.getDb().db('cse341_personal').collection('country').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getData = async (req, res) => {
  //#swagger.tags = ['Country']
  const id = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cse341_personal').collection('country').find({ _id: id });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createData = async (req, res, next) => {
  //#swagger.tags = ['Country']
  try {
    // Data validation
    const { countryName, capital, population, area, flagUrl } = req.body;
    
    if (!countryName || !capital || population == null || area == null) {
      return res.status(400).json({ error: 'Missing required fields: countryName, capital, population, area' });
    }
    
    const numPopulation = Number(population);
    const numArea = Number(area);
    
    if (isNaN(numPopulation) || numPopulation < 0) {
      return res.status(400).json({ error: 'Invalid population - must be a positive number' });
    }
    
    if (isNaN(numArea) || numArea < 0) {
      return res.status(400).json({ error: 'Invalid area - must be a positive number' });
    }
    
    const country = {
      countryName,
      capital,
      population: numPopulation,
      area: numArea,
      flagUrl: flagUrl || ''
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('country').insertOne(country);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create country' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while creating country' });
  }
};


const updateData = async (req, res, next) => {
  //#swagger.tags = ['Country']
  try {
    // Data validation
    const { countryName, capital, population, area, flagUrl } = req.body;
    
    if (!countryName || !capital || population == null || area == null) {
      return res.status(400).json({ error: 'Missing required fields: countryName, capital, population, area' });
    }
    
    const numPopulation = Number(population);
    const numArea = Number(area);
    
    if (isNaN(numPopulation) || numPopulation < 0) {
      return res.status(400).json({ error: 'Invalid population - must be a positive number' });
    }
    
    if (isNaN(numArea) || numArea < 0) {
      return res.status(400).json({ error: 'Invalid area - must be a positive number' });
    }
    
    const id = new ObjectId(req.params.id);
    const country = {
      countryName,
      capital,
      population: numPopulation,
      area: numArea,
      flagUrl: flagUrl || ''
    };
    
    const response = await mongodb.getDb().db('cse341_personal').collection('country').replaceOne({ _id: id }, country);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'Failed to update country' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while updating country' });
  }
};

const deleteData = async (req, res, next) => {
  //#swagger.tags = ['Country']
  const id = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('cse341_personal').collection('country').deleteOne({ _id: id });
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