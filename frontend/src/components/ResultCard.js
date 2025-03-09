import React from 'react';

function ResultCard({ result, index, theme }) {
  return (
    <div
      className="mb-4 animate__animated animate__fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3 className="fs-5">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1e90ff', textDecoration: 'none' }} // Changed to light blue (#1e90ff)
        >
          {result.title}
        </a>
      </h3>
      <cite className="text-success" style={{ fontSize: '0.9rem' }}>{result.url}</cite>
      <p className="text-muted" style={{ fontSize: '0.9rem', color: theme === 'dark' ? '#ccc' : '#666' }}>
        {result.snippet}
      </p>
    </div>
  );
}

export default ResultCard;