import React, { useState } from 'react';

export default function Filter({ onFilterChange }) {
  const [searchString, setSearchString] = useState('');

  const handleSearchChange = (event) => {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);
    onFilterChange(newSearchString);
  };

  return (
    <div>
      <div className="gallery-filter">
        <input
          type="text"
          placeholder="Bildersuche"
          id="search-box"
          value={searchString}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}