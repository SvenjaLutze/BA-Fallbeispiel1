import React, { useState } from 'react';

export default function Filter({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <div>
      <div className="gallery-filter">
        <input
          type="text"
          placeholder="Bildersuche"
          id="search-box"
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      <div id="search-status" aria-live="polite" className="sr-only">
        {status}
      </div>
    </div>
  );
}
