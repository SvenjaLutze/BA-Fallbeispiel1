import React, { useState, useEffect, useMemo, useRef } from 'react';
import GalleryItem from './GalleryItem.js';
import Filter from './Filter.js';

import initialGalleryItems from '../data/initialGallery.js';
import additionalGalleryItems from '../data/additionalGallery.js';

const keyCodes = {
    TAB: 9
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [status, setStatus] = useState("");
  const [galleryItemFocusPosition, setGalleryItemFocusPosition] = useState(0);

  const focusHolderRef = useRef();
  
  const handleKeyDown = (event) => {
    const keyCode = event.keyCode ? event.keyCode : event.charCode;

    if (keyCode !== keyCodes.TAB) {
        return true;
    }

    event.preventDefault();

    let newGalleryItemFocusPosition = galleryItemFocusPosition + 1;

    if (event.shiftKey) {
        newGalleryItemFocusPosition = galleryItemFocusPosition;
    }

    refsById[`galleryItem-${newGalleryItemFocusPosition}`].current.focus()
  }

  const loadMoreElements = () => {
    focusHolderRef.current.focus();

    setStatus('Es werden Bilder geladen');
    setGalleryItemFocusPosition(galleryItems.length);

    setTimeout(() => {
      const nextGalleryItems = [...galleryItems, ...additionalGalleryItems];

      setGalleryItems(nextGalleryItems);
      setStatus('Es wurden Bilder geladen');

    }, 1000);
  };

  const handleFilterChange = (searchString) => {
    const filteredGallery = initialGalleryItems.filter((item) => {
      const tagList = item.tags.split(',');
      return tagList.some((tag) => tag.includes(searchString));
    });
    // Do something with the filteredGallery
  };

  const refsById = useMemo(() => {
    const refs = {}
    galleryItems.forEach((galleryItem, index) => {
        refs[`galleryItem-${index + 1}`] = React.createRef(null)
    })

    return refs
}, [galleryItems])

  return (
    <div>
      <div className="container"></div>
      <div id='status' aria-atomic="true" className='sr-only'>{status}</div>
      <h1>Vintage Bildergalerie</h1>
      
     {/* Search-Bar */}
      <Filter onFilterChange={handleFilterChange} />

     {/* GalleryItems */}  
      <ul className='gallery'>
        {galleryItems.map((item, index) => (
          <GalleryItem 
            innerRef={refsById[`galleryItem-${index + 1}`]}
            key={index} 
            src={item.src} 
            alt={item.alt} 
            />
        ))}
      </ul>

      {/* focusHolderElement */}
      <a
        ref={focusHolderRef} 
        onKeyDown={handleKeyDown}
        tabIndex="-1" 
        role="presentation" 
        aria-hidden="true" 
        id="focus-element">
      </a>

      <button id='show-all' onClick={loadMoreElements}>
        Mehr Bilder anzeigen
      </button>

     
    </div>
  );
};
