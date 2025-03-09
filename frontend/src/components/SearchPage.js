import React, { useState, useEffect } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResultCard from './ResultCard';

function SearchPage({ theme }) {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search`, {
          params: { q: query, page: currentPage, limit: 10 },
        });
        setResults(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching results:', error);
        setResults([{ title: 'Error', url: '#', snippet: 'Something went wrong!' }]);
        setTotalPages(1);
      }
    };
    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setTotalPages(1);
    }
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div style={{ background: '#202124', minHeight: '100vh' }}> {/* Changed background to #202124 */}
      <Container className="py-4">
        <h2 style={{ color: '#fff' }}>Results for "{query || 'No query'}"</h2>
        <div className="results mt-4">
          {results.map((result, index) => (
            <ResultCard key={index} result={result} index={index} theme={theme} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </Container>
    </div>
  );
}

export default SearchPage;