import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Modal, Form, Nav, Dropdown } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchPage from './components/SearchPage';
import Tab from './components/Tab';

function App() {
  const [tabs, setTabs] = useState([{ id: Date.now(), title: 'New Tab', path: '/' }]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('backgroundImage') ||
    (theme === 'dark'
      ? 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
      : 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')
  );
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem('recentSearches') || '[]'));
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
  const [showSettings, setShowSettings] = useState(false);
  const [isIncognito, setIsIncognito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    localStorage.setItem('theme', theme);
    localStorage.setItem('backgroundImage', backgroundImage);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [theme, backgroundImage, recentSearches, searchHistory]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setBackgroundImage(
      newTheme === 'dark'
        ? 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        : 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
    );
  };

  const toggleIncognitoMode = () => {
    setIsIncognito(!isIncognito);
  };

  const addTab = () => {
    const newTab = { id: Date.now(), title: 'New Tab', path: '/' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    navigate('/');
  };

  const closeTab = (id) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    if (updatedTabs.length === 0) {
      const newTab = { id: Date.now(), title: 'New Tab', path: '/' };
      setTabs([newTab]);
      setActiveTab(newTab.id);
      navigate('/');
    } else {
      setTabs(updatedTabs);
      setActiveTab(updatedTabs[0].id);
      navigate(updatedTabs[0].path);
    }
  };

  const closeAllTabs = () => {
    const newTab = { id: Date.now(), title: 'New Tab', path: '/' };
    setTabs([newTab]);
    setActiveTab(newTab.id);
    navigate('/');
  };

  const updateTab = (id, title, path) => {
    const updatedTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, title, path } : tab
    );
    setTabs(updatedTabs);
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setRecentSearches([]);
  };

  const deleteHistoryItem = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    const updatedSearches = recentSearches.filter((search) => !updatedHistory.some((item) => item.query === search));
    setRecentSearches(updatedSearches);
  };

  const addRecentSearch = (query) => {
    if (!isIncognito) {
      setRecentSearches((prev) => (!prev.includes(query) ? [query, ...prev.slice(0, 4)] : prev));
      setSearchHistory((prev) => [
        { query, timestamp: new Date().toLocaleString() },
        ...prev,
      ]);
    }
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <Container fluid className="py-2">
        <Nav className="mb-3 justify-content-between align-items-center">
          <div className="d-flex">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => {
                  console.log(`Switching to tab ${tab.id} with path ${tab.path}`);
                  setActiveTab(tab.id);
                  navigate(tab.path);
                }}
                onClose={() => closeTab(tab.id)}
              />
            ))}
            <Button
              variant="outline-light"
              className="ms-2 animate__animated animate__flipInX"
              style={{
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              onClick={addTab}
            >
              + New Tab
            </Button>
            <Button
              variant="outline-light"
              className="ms-2 animate__animated animate__flipInX"
              style={{
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              onClick={closeAllTabs}
            >
              Close All
            </Button>
          </div>
          <div>
            <Button
              variant="outline-light"
              className="me-2 animate__animated animate__flipInX"
              style={{
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                background: isIncognito ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              onClick={toggleIncognitoMode}
            >
              {isIncognito ? 'Incognito On' : 'Incognito Off'}
            </Button>
            <Button
              variant="outline-light"
              className="me-2 animate__animated animate__flipInX"
              style={{
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              onClick={handleThemeToggle}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button
              variant="outline-light"
              className="animate__animated animate__flipInX"
              style={{
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              onClick={() => setShowSettings(true)}
            >
              Settings
            </Button>
          </div>
        </Nav>
        <div className="tab-content animate__animated">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  addRecentSearch={addRecentSearch}
                  recentSearches={recentSearches}
                  theme={theme}
                  updateTab={(title, path) => updateTab(activeTab, title, path)}
                  setRecentSearches={setRecentSearches}
                  setSearchHistory={setSearchHistory}
                  searchHistory={searchHistory}
                  isIncognito={isIncognito}
                />
              }
            />
            <Route
              path="/search/:query"
              element={<SearchPage theme={theme} />}
            />
          </Routes>
        </div>
      </Container>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} centered>
        <Modal.Header closeButton style={{ background: theme === 'dark' ? '#2e2e2e' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: theme === 'dark' ? '#2e2e2e' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
          <Form.Group controlId="backgroundImage" className="mb-3">
            <Form.Label>Change Background Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleBackgroundChange} />
          </Form.Group>
          <h5>Search History</h5>
          {searchHistory.length > 0 ? (
            <ul className="list-group">
              {searchHistory.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ background: theme === 'dark' ? '#3e3e3e' : '#f8f9fa' }}>
                  <span>{item.query} - {item.timestamp}</span>
                  <Button variant="danger" size="sm" onClick={() => deleteHistoryItem(index)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No search history available.</p>
          )}
          <Button variant="danger" className="mt-3" onClick={clearHistory}>
            Clear All History
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ background: theme === 'dark' ? '#2e2e2e' : '#fff' }}>
          <Button variant="secondary" onClick={() => setShowSettings(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function MainPage({ addRecentSearch, recentSearches, theme, updateTab, setRecentSearches, setSearchHistory, searchHistory, isIncognito }) {
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, index: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSearch = (query) => {
    console.log('Searching for:', query, 'Incognito:', isIncognito);
    if (!isIncognito) {
      addRecentSearch(query);
    }
    const encodedQuery = encodeURIComponent(query);
    updateTab(`Search: ${query}`, `/search/${encodedQuery}`);
    console.log('Navigating to:', `/search/${encodedQuery}`);
    navigate(`/search/${encodedQuery}`);
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.pageX, y: e.pageY, index });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, index: null });
  };

  const handleDeleteShortcut = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    // Removed the logic to update searchHistory
    handleCloseContextMenu();
  };

  const handleEditShortcut = (index) => {
    setEditingIndex(index);
    setEditValue(recentSearches[index]);
    handleCloseContextMenu();
  };

  const handleSaveEdit = (index) => {
    const updatedSearches = [...recentSearches];
    updatedSearches[index] = editValue;
    setRecentSearches(updatedSearches);
    const updatedHistory = searchHistory.map((item) =>
      item.query === recentSearches[index] ? { ...item, query: editValue } : item
    );
    setSearchHistory(updatedHistory);
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <Container className="py-4 text-center">
      <h1 className="mb-4" style={{ fontFamily: 'Montserrat', fontSize: '3.5rem', color: theme === 'dark' ? '#00d4ff' : '#ff007a', textShadow: '0 0 20px rgba(0,212,255,0.7), 0 0 10px rgba(255,0,122,0.5)' }}>
        Toggle
      </h1>
      <SearchBar onSearch={handleSearch} theme={theme} />
      {recentSearches.length > 0 && (
        <div className="shortcuts-container mt-4">
          <Row>
            {recentSearches.map((search, index) => (
              <Col key={index} xs={6} md={2} className="mb-2">
                {editingIndex === index ? (
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={{ borderRadius: '15px 0 0 15px', padding: '8px' }}
                    />
                    <Button
                      variant="success"
                      onClick={() => handleSaveEdit(index)}
                      style={{ borderRadius: '0 15px 15px 0', padding: '8px' }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                    className="w-100 shortcut-button"
                    onClick={() => handleSearch(search)}
                    onContextMenu={(e) => handleContextMenu(e, index)}
                    style={{ borderRadius: '15px', padding: '8px' }}
                  >
                    <span role="img" aria-label="logo">🔍</span> {search}
                  </Button>
                )}
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Dropdown
        show={contextMenu.show}
        style={{ position: 'absolute', top: contextMenu.y, left: contextMenu.x }}
        onToggle={handleCloseContextMenu}
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleEditShortcut(contextMenu.index)}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeleteShortcut(contextMenu.index)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default App;