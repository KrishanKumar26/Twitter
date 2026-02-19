const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let tweets = [];

// GET tweets
app.get('/tweets', (req, res) => {
    res.json(tweets);
});

// POST tweet
app.post('/tweets', (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Tweet text required' });
    }

    const newTweet = {
        id: Date.now(),
        text,
        createdAt: new Date()
    };

    tweets.push(newTweet);

    res.status(201).json(newTweet);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});