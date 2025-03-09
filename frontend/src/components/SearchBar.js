import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

function SearchBar({ onSearch, theme }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setTimeout(() => {
      onSearch(query);
      setLoading(false);
    }, 500);
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
      <div className="search-section" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="input-group">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="shadow-sm"
            style={{
              borderRadius: '25px 0 0 25px',
              borderRight: 'none',
              background: theme === 'dark' ? '#2e2e2e' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
              border: '1px solid ' + (theme === 'dark' ? '#555' : '#dfe1e5'),
              fontSize: '1.1rem',
              padding: '12px 20px',
            }}
          />
          <Button
            variant="primary"
            type="submit"
            className="shadow-sm"
            style={{
              borderRadius: '0 25px 25px 0',
              borderLeft: 'none',
              background: 'linear-gradient(45deg, #00d4ff, #ff007a)',
              border: 'none',
              padding: '12px 25px',
              fontWeight: 'bold',
              color: '#fff',
              transition: 'transform 0.2s',
            }}
            disabled={loading}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default SearchBar;