import React, { useState } from 'react';
import axios from 'axios';

const AverageGoals = () => {
    const [year, setYear] = useState('');
    const [averageGoals, setAverageGoals] = useState(null);
    const [error, setError] = useState(null);

    const fetchAverageGoals = async () => {
        setError(null); // Reset any previous errors
        setAverageGoals(null); // Reset the previous averageGoals value

        try {
            const response = await axios.get(`http://localhost:5000/api/football/goals/${year}`);
            console.log("API Response:", response.data);

            if (response.data && response.data.averageGoalsFor !== undefined) {
                setAverageGoals(response.data.averageGoalsFor.toFixed(2));
            } else {
                setError("No average goals data found for the given year.");
            }
        } catch (err) {
            console.error("Error fetching average goals:", err);
            setError("Failed to fetch average goals. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Average Goals For Teams in a Given Year</h2>
            <div>
                <label>Year: </label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button onClick={fetchAverageGoals}>Fetch Data</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {averageGoals !== null && (
                <p>Average Goals For: <strong>{averageGoals}</strong></p>
            )}
        </div>
    );
};

export default AverageGoals;
