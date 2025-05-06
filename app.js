const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; 