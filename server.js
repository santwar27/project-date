const express = require('express');
const cors = require('cors');
const path = require('path'); // Added this to help with file paths!
const app = express();

// Render will tell us which port to use, or we use 3000 at home
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

// This line is super important! It tells Render to serve your 
// HTML, CSS, and JS files to anyone who visits the link.
app.use(express.static(path.join(__dirname, '.')));

app.post('/save-date', (req, res) => {
    console.log("\x1b[35m%s\x1b[0m", "--- OH MY GOSH, A DATE IS PLANNED! ---");
    console.log("Food Type:", req.body.food);
    console.log("Restaurant:", req.body.where);
    console.log("\x1b[32m%s\x1b[0m", "Date scheduled: " + req.body.when);
    console.log("---------------------------------------");

    res.send({ status: "Success! See you then!" });
});

// We have to serve the index.html file when someone goes to the main URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`My cute server is running on port ${port}`);
});