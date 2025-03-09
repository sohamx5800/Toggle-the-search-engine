import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Tab({ tab, isActive, onClick, onClose }) {
  const navigate = useNavigate();

  return (
    <Nav.Item>
      <Nav.Link
        eventKey={tab.id}
        onClick={() => onClick(navigate)}
        style={{
          background: isActive ? 'linear-gradient(45deg, #00d4ff, #ff007a)' : '#444',
          color: '#fff',
          borderRadius: '10px 10px 0 0',
          marginRight: '5px',
          padding: '8px 15px',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          boxShadow: isActive ? '0 0 10px rgba(0,212,255,0.5)' : 'none',
        }}
        onMouseOver={(e) => {
          if (!isActive) e.target.style.background = '#555';
        }}
        onMouseOut={(e) => {
          if (!isActive) e.target.style.background = '#444';
        }}
      >
        {tab.title}
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClose(navigate);
          }}
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: '#ff4444',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.color = '#ff6666')}
          onMouseOut={(e) => (e.target.style.color = '#ff4444')}
        >
          ✕
        </span>
      </Nav.Link>
    </Nav.Item>
  );
}

export default Tab;