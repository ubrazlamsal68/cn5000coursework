const mongoose = require('mongoose');

// Define the schema for football data
const footballSchema = new mongoose.Schema({
    Team: { type: String, required: true },
    GamesPlayed: { type: Number, required: true },
    Win: { type: Number, required: true },
    Draw: { type: Number, required: true },
    Loss: { type: Number, required: true },
    GoalsFor: { type: Number, required: true },
    GoalsAgainst: { type: Number, required: true },
    Points: { type: Number, required: true },
    Year: { type: Number, required: true }
});

// Create a Mongoose model from the schema
const Football = mongoose.model('FootballData', footballSchema);

// Export the model
module.exports = Football;
