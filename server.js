const express = require('express'); // Import Express
const connectDB = require('./dbConnect'); // Import MongoDB connection function
const Football = require('./footballModel'); // Import the Mongoose model

const app = express(); // Initialize Express
const PORT = 5000; // Define the port
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Route to fetch all football data
app.get('/api/football', async (req, res) => {
    try {
        const footballData = await Football.find();
        res.status(200).json(footballData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST method to add data to the Football collection
app.post('/api/football', async (req, res) => {
    const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;

    // Validate the fields
    if (!Team || isNaN(GamesPlayed) || isNaN(Win) || isNaN(Draw) || isNaN(Loss) || isNaN(GoalsFor) || isNaN(GoalsAgainst) || isNaN(Points) || isNaN(Year)) {
        return res.status(400).json({ message: "Invalid input. Please check all fields." });
    }

    try {
        const newTeam = new Football({
            Team,
            GamesPlayed: Number(GamesPlayed),
            Win: Number(Win),
            Draw: Number(Draw),
            Loss: Number(Loss),
            GoalsFor: Number(GoalsFor),
            GoalsAgainst: Number(GoalsAgainst),
            Points: Number(Points),
            Year: Number(Year)
        });

        const savedTeam = await newTeam.save();
        res.status(201).json({
            message: 'New team added successfully',
            data: savedTeam
        });
    } catch (error) {
        console.error('Error saving team:', error.message);
        res.status(500).json({ message: 'Error saving team', error: error.message });
    }
});

app.post('/api/football/update', async (req, res) => {
    const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;

    try {
        const updatedTeam = await Football.findOneAndUpdate(
            { Team: Team }, // Query to match the team
            {
                $set: {
                    GamesPlayed,
                    Win,
                    Draw,
                    Loss,
                    GoalsFor,
                    GoalsAgainst,
                    Points,
                    Year
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({
            message: 'Team updated successfully',
            data: updatedTeam
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error: error.message });
    }
});

// POST method to delete a record by Team name
app.post('/api/football/delete', async (req, res) => {
    const { Team } = req.body; // Extract the Team name from the request body

    try {
        // Find and delete the document by Team name
        const deletedTeam = await Football.findOneAndDelete({ Team: Team });

        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({
            message: 'Team deleted successfully',
            data: deletedTeam
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error: error.message });
    }
});

app.get('/api/football/summary/:year', async (req, res) => {
    const { year } = req.params;

    console.log('Year received:', year); // Debug log
    try {
        const records = await Football.find({ Year: parseInt(year) });
        console.log('Records found:', records); // Debug log

        if (records.length === 0) {
            console.log('No records found'); // Debug log
            return res.status(404).json({ message: `No records found for the year ${year}` });
        }

        const totalGamesPlayed = records.reduce((sum, record) => sum + record.GamesPlayed, 0);
        const totalDraws = records.reduce((sum, record) => sum + record.Draw, 0);
        const totalWins = records.reduce((sum, record) => sum + record.Win, 0);

        console.log('Totals:', { totalGamesPlayed, totalDraws, totalWins }); // Debug log

        res.status(200).json({
            year,
            totalGamesPlayed,
            totalDraws,
            totalWins
        });
    } catch (error) {
        console.error('Error:', error.message); // Debug log
        res.status(500).json({ message: 'Error retrieving summary', error: error.message });
    }
});

// GET method to fetch the first 10 teams with matches won greater than a given value
app.get('/api/football/wins/:minWins', async (req, res) => {
    const { minWins } = req.params; // Extract the minimum number of wins from the route parameters

    try {
        // Query the database to find teams with wins greater than the given value
        const teams = await Football.find({ Win: { $gt: parseInt(minWins) } }).limit(10); // Limit to the first 10 records

        if (teams.length === 0) {
            return res.status(404).json({ message: `No teams found with wins greater than ${minWins}` });
        }

        // Return the data as JSON
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: `Error fetching data: ${error.message}` });
    }
});

// GET method to display teams and calculate average "Goals For" for a given year
app.get('/api/football/goals/:year', async (req, res) => {
    const { year } = req.params; // Extract the year from the route parameters

    try {
        // Find all records for the given year
        const records = await Football.find({ Year: parseInt(year) });

        if (records.length === 0) {
            return res.status(404).send(`<h2>No teams found for the year ${year}</h2>`);
        }

        // Calculate the average "Goals For"
        const totalGoalsFor = records.reduce((sum, record) => sum + record.GoalsFor, 0);
        const averageGoalsFor = totalGoalsFor / records.length;

        // Display data in the browser
        let html = `<h1>Teams and Average "Goals For" in ${year}</h1>`;
        html += `<h2>Average "Goals For": ${averageGoalsFor.toFixed(2)}</h2>`;
        html += '<table border="1"><tr><th>Team</th><th>Games Played</th><th>Win</th><th>Draw</th><th>Loss</th><th>Goals For</th><th>Goals Against</th><th>Points</th><th>Year</th></tr>';
        records.forEach(record => {
            html += `<tr>
                        <td>${record.Team}</td>
                        <td>${record.GamesPlayed}</td>
                        <td>${record.Win}</td>
                        <td>${record.Draw}</td>
                        <td>${record.Loss}</td>
                        <td>${record.GoalsFor}</td>
                        <td>${record.GoalsAgainst}</td>
                        <td>${record.Points}</td>
                        <td>${record.Year}</td>
                    </tr>`;
        });
        html += '</table>';

        res.status(200).send(html); // Send the HTML response
    } catch (error) {
        res.status(500).send(`<h2>Error fetching data: ${error.message}</h2>`);
    }
});

app.get('/api/football/summary/:team', async (req, res) => {
    const { team } = req.params; // Extract team name from the request parameters

    try {
        // Find the record for the given team
        const record = await Football.findOne({ Team: team });

        if (!record) {
            return res.status(404).json({ message: `No records found for team ${team}` });
        }

        // Retrieve the required details
        const totalGamesPlayed = record.GamesPlayed;
        const totalDraws = record.Draw;
        const totalWins = record.Win;

        res.status(200).json({
            totalGamesPlayed,
            totalDraws,
            totalWins,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving summary', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


