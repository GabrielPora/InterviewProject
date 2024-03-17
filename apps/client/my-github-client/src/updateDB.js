import React, { useState } from 'react';
import axios from 'axios';

const UpdateButton = () => {
  const [owner, setOwner] = useState('');
  const [repos, setRepos] = useState('');
  const [response, setResponse] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    try {
      setShowTooltip(false); // Hide the tooltip when the button is clicked
      await axios.get('http://localhost:4200/populatedb', {
        params: {
          owner,
          repos
        }
      });
      setResponse('Data updated successfully!');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error updating data, Check Token:', error);
      setResponse('Error updating data, Check Token');
    }
  };

  return (
    <div>
      <label>
        UserName:
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </label>
      <br />
      <label>
        Repo:
        <input type="text" value={repos} onChange={(e) => setRepos(e.target.value)} />
      </label>
      <br />
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Update DB
      </button>
      {showTooltip && <div style={{ position: 'absolute', marginTop: '10px', color: 'red' }}>Click only once to update Database</div>}
      <div>{response}</div>
    </div>
  );
};

export default UpdateButton;
