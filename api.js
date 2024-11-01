const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, 'backend', 'users.json');
const cardsFilePath = path.join(__dirname, 'backend', 'cards.json');

// Endpoint to get users data
app.get('/api/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading users data' });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading users data' });
    }
    const usersData = JSON.parse(data);
    usersData.users.push({ ...newUser, id: Date.now() });
    fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing users data' });
      }
      res.json(usersData);
    });
  });
});

// Endpoint to remove a user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading users data' });
    }
    const usersData = JSON.parse(data);
    usersData.users = usersData.users.filter(user => user.id !== userId);
    fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing users data' });
      }
      res.json(usersData);
    });
  });
});

// Endpoint to assign an approver
app.put('/api/hierarchy/:cathedra', (req, res) => {
  const { userId } = req.body;
  const cathedra = req.params.cathedra;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading users data' });
    }
    const usersData = JSON.parse(data);
    usersData.hierarchy[cathedra] = userId;
    fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing users data' });
      }
      res.json(usersData);
    });
  });
});

/* ---------------------- Cards API Endpoints ---------------------- */

// Endpoint to get all letters
app.get('/api/letters', (req, res) => {
  fs.readFile(cardsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading cards data' });
    }
    res.json(JSON.parse(data).letters);
  });
});

// Endpoint to update the status of a letter
app.put('/api/letters/:id/status', (req, res) => {
  const letterId = parseInt(req.params.id);
  const { status } = req.body;

  fs.readFile(cardsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading cards data' });
    }
    const cardsData = JSON.parse(data);
    const letter = cardsData.letters.find(letter => letter.id === letterId);

    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }

    letter.status = status;
    fs.writeFile(cardsFilePath, JSON.stringify(cardsData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing cards data' });
      }
      res.json(letter);
    });
  });
});

// Endpoint to add a new letter
app.post('/api/letters', (req, res) => {
  const newLetter = req.body;
  fs.readFile(cardsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading cards data' });
    }
    const cardsData = JSON.parse(data);
    const newId = Date.now();
    const letterWithId = { ...newLetter, id: newId };
    cardsData.letters.push(letterWithId);

    fs.writeFile(cardsFilePath, JSON.stringify(cardsData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing cards data' });
      }
      res.json(letterWithId);
    });
  });
});

// Endpoint to delete a letter
app.delete('/api/letters/:id', (req, res) => {
  const letterId = parseInt(req.params.id);

  fs.readFile(cardsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading cards data' });
    }
    const cardsData = JSON.parse(data);
    cardsData.letters = cardsData.letters.filter(letter => letter.id !== letterId);

    fs.writeFile(cardsFilePath, JSON.stringify(cardsData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing cards data' });
      }
      res.json(cardsData.letters);
    });
  });
});

/* ---------------------- Server Setup ---------------------- */

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
