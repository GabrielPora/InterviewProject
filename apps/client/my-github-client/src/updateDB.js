import React, { useState } from 'react';
import axios from 'axios';

const UpdateButton = () => {
  const [owner, setOwner] = useState('');
  const [repos, setRepos] = useState('');
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      await axios.get('http://localhost:4200/populatedb', {
        params: {
          owner,
          repos
        }
      });
      setResponse('Data updated successfully!');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error updating data:', error);
      setResponse('Error updating data');
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
      <button onClick={handleClick}>Update DB</button>
      <div>{response}</div>
    </div>
  );
};

export default UpdateButton;
