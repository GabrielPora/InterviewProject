import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableView = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4200/getallcommits');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((commit) =>
    commit.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleFavoriteToggle = (commitId) => {
    if (favorites.includes(commitId)) {
      setFavorites(favorites.filter((id) => id !== commitId));
    } else {
      setFavorites([...favorites, commitId]);
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>Comment Count</th>
            <th>URL</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((commit) => (
            <tr key={commit.id}>
              <td>{commit.id}</td>
              <td>{commit.message}</td>
              <td>{commit.comment_count}</td>
              <td>{commit.url}</td>
              <td>
                <button
                  onClick={() => handleFavoriteToggle(commit.id)}
                  style={{ color: favorites.includes(commit.id) ? 'red' : 'black' }}
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
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
            {i + 1} 
          </button>
        ))}
		<br></br>
		<br></br>
		<br></br>
      </div>
    </div>
  );
};

export default TableView;
