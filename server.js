// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Route to handle the date string
app.get('/api/:date_string?', (req, res) => {
    const dateString = req.params.date_string;
    let date;

    if (!dateString) {
        date = new Date();
    } else if (/^\d+$/.test(dateString)) {
        // If dateString is a number, assume it's a Unix timestamp
        date = new Date(parseInt(dateString));
    } else {
        date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
