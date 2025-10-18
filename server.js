const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Entry = require('./models/Entry');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send('Welcome to the Personal Budget API');
});

app.get('/data', async (req, res) => {
  try {
    const entries = await Entry.find().lean();
    res.json({ myBudget: entries });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Error loading budget data' });
  }
});

app.post('/data', async (req, res) => {
  try {
    const { title, value, color } = req.body;

    if (!title || !value || !color) {
      return res.status(400).json({ error: 'All fields (title, value, color) are required' });
    }

    const entry = new Entry({ title, value, color });
    const savedEntry = await entry.save();

    res.status(201).json(savedEntry);
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/budget', async (req, res) => {
  try {
    const entries = await Entry.find().lean();
    res.json({ myBudget: entries });
  } catch (err) {
    console.error('Error fetching budget:', err);
    res.status(500).json({ error: 'Error loading budget data' });
  }
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personalbudget';

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
       console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
