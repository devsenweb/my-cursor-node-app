const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Add JSON parsing middleware
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Add a new test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'CI/CD workflow test endpoint',
    timestamp: new Date().toISOString()
  });
});

// Add sum endpoint with validation
app.post('/api/sum', (req, res) => {
  const { numbers } = req.body;
  
  // Input validation
  if (!Array.isArray(numbers)) {
    return res.status(400).json({ 
      error: 'Input must be an array of numbers' 
    });
  }

  // Validate all elements are numbers
  if (!numbers.every(num => typeof num === 'number')) {
    return res.status(400).json({ 
      error: 'All elements must be numbers' 
    });
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  res.json({ sum });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; 