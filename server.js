const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // This tool lets the server write files!
const app = express();

const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/save-date', (req, res) => {
    // 1. Create a nice string of the date info
    const dateEntry = `New Date: ${req.body.food} at ${req.body.where} on ${req.body.when}\n`;

    // 2. Save it to a file named 'dates.txt'
    // 'a' means "append" - it adds to the end of the file instead of overwriting it!
    fs.appendFile('dates.txt', dateEntry, (err) => {
        if (err) {
            console.log("Oops, couldn't save to the file!");
        } else {
            console.log("Success! Saved to dates.txt");
        }
    });

    // Still keep the console logs for the vibes
    console.log("\x1b[35m%s\x1b[0m", "--- OH MY GOSH, A DATE IS PLANNED! ---");
    console.log(dateEntry);

    res.send({ status: "Success! See you then!" });
});

// A secret way for YOU to see all the dates in your browser!
// If you go to your-url.com/view-dates, it will show you the list.
app.get('/view-dates', (req, res) => {
    res.sendFile(path.join(__dirname, 'dates.txt'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`My cute server is running on port ${port}`);
});