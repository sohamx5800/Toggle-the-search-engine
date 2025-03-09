const express = require('express');
const cors = require('cors');
const mockResults = require('./data/mockResults');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  const { results, totalPages, currentPage } = mockResults(query, page, limit);
  res.json({ results, totalPages, currentPage });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});