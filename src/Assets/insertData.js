const mongoose = require('mongoose');
const fs = require('fs');

// Load the JSON file
const jsonData = require('./output.json');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satellite_21:3uCWwwf8K49dvq3B@satellite.cfn4pz0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the collection
const movieSchema = new mongoose.Schema({
  Title: String,
  URL: String,
});

// Create a model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Insert the data into MongoDB
async function insertData() {
  try {
    // Delete existing documents in the collection (optional)
    await Movie.deleteMany();

    // Insert each document from the JSON data
    for (const movie of jsonData) {
      await Movie.create(movie);
    }

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Call the insertData function
insertData();
