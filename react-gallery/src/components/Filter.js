import React, { useState } from 'react';

export default function Filter({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    onSearch(e.target.value.toLowerCase());
  };

  const handleFocus = () => {
    setStatus("Das Suchfeld wurde ausgewählt. Geben Sie einen Suchbegriff ein.");
  }

  const handleBlur = () => {
    setStatus("");
  }

  return (
    <div>
      <div className="gallery-filter">
        <input
          type="text"
          placeholder="Bildersuche"
          id="search-box"
          value={searchInput}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div id="search-status" aria-live="polite" className="sr-only">
        {status}
      </div>
    </div>
  );
}
