import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableView = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4200/getallcommits');
        setData(response.data);

		const initialFavorites = response.data.filter(commit => commit.favorite).map(commit => commit.id);
        setFavorites(initialFavorites);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((commit) =>
    commit.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFavorites = showFavoritesOnly ? filteredData.filter(commit => favorites.includes(commit.id)) : filteredData;

  const pageSize = 10;
  const totalPages = Math.ceil(filteredFavorites.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredFavorites.slice(startIndex, endIndex);

  const handleFavoriteToggle = (commitId) => {
    if (favorites.includes(commitId)) {
	  const response = axios.post(`http://localhost:4200/favorite?id=${commitId}&favorite=false`);
      setFavorites(favorites.filter((id) => id !== commitId));
    } else {
	  const response = axios.post(`http://localhost:4200/favorite?id=${commitId}&favorite=true`);
      setFavorites([...favorites, commitId]);
    }
  };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
  <h2 style={{ marginBottom: '20px' }}>Commits Data Table</h2>
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ marginBottom: '20px', padding: '8px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '85%' }}
  />
  <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
  style={{ marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
  >
        {showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}
      </button>
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
    <thead>
      <tr>
        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Message</th>
        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Comment Count</th>
        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>URL</th>
        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Favorite</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.map((commit) => (
        <tr key={commit.id}>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{commit.id}</td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{commit.message}</td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{commit.comment_count}</td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{commit.url}</td>
          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
            <button
              onClick={() => handleFavoriteToggle(commit.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                background: favorites.includes(commit.id) ? 'red' : 'transparent',
                color: favorites.includes(commit.id) ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {favorites.includes(commit.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setCurrentPage(i + 1)}
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          margin: '0 2px',
		  marginBottom: '30px',
          background: 'transparent',
          cursor: 'pointer'
        }}
      >
        {i + 1}
      </button>
    ))}
  </div>
</div>

  );
};

export default TableView;
