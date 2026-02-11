const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the final submission
app.post('/submit', (req, res) => {
  const { name, answers } = req.body;
  
  console.log('Received submission from:', name);
  console.log('Total answers:', answers.length);
  console.log('Full data:', JSON.stringify(req.body, null, 2));
  
  // Here you can process the answers as needed
  // For now, just send a success response
  res.json({ 
    success: true, 
    message: `Thank you ${name}! Your answers have been submitted successfully!`,
    data: req.body 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
