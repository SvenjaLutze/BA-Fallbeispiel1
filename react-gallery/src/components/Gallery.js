import React, { useState, useMemo, useRef } from 'react';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton/src';

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
  const [galleryIsFiltered, setGalleryIsFiltered] = useState(false);
  const [galleryItemFocusPosition, setGalleryItemFocusPosition] = useState(0);
  const allGalleryItemsRef = useRef(initialGalleryItems); // copy for any new filter request

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

      allGalleryItemsRef.value = nextGalleryItems;
    }, 1000);
  };
  
  const refsById = useMemo(() => {
    const refs = {}
    galleryItems.forEach((galleryItem, index) => {
        refs[`galleryItem-${index + 1}`] = React.createRef()
    })

    return refs;
  }, [galleryItems]);

  const filterGallery = (searchValue) => {
    const filteredGalleryItems = allGalleryItemsRef.current.filter((item) => {
      const tags = item.tags.split(",").map((tag) => tag.trim());
      return tags.some((tag) => tag.toLowerCase().indexOf(searchValue) !== -1);
    });
    // ".some" returns true if, in the array, it finds an element for which the provided 
    // function returns true; otherwise it returns false. It doesn't modify the array.

    // "indexOf" returns the first index at which a given element can be found in the 
    // array, or -1 if it is not present. 

    setGalleryItems(filteredGalleryItems);

    return filteredGalleryItems.length;
  }

  const handleSelection = (menuItemText, event) => {
    setGalleryIsFiltered(menuItemText !== 'Alle anzeigen');

    const searchValue = galleryIsFiltered ? '' : menuItemText;
    const matchCount = filterGallery(searchValue.toLowerCase());

    setTimeout(function() {
      setStatus(`Anzahl der Treffer zu ${menuItemText}: ${matchCount}`);
    }, 100);
  }

  return (
    <div>
      <div className="container"></div>

      <div 
        id='status' 
        aria-atomic="true" 
        aria-live='polite'
        className='sr-only'>
          {status}
      </div>

      <h1>Vintage Bildergalerie</h1>
      
      <Wrapper
        className='MyMenuButton'
        onSelection={handleSelection}
      >
        <Button className='vcs'>
          <span className='sr-only'>Bildergalerie nach Kategorien filtern</span>
          <span className='button-content'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M22.906 2.841c1.104-2.412-7.833-2.841-10.907-2.841-2.934 0-12.01.429-10.906 2.841.508 1.11 8.907 12.916 8.907 12.916v5.246l4 2.997v-8.243s8.398-11.806 8.906-12.916zm-10.901-.902c4.243 0 8.144.575 8.144 1.226s-3.9 1.18-8.144 1.18-8.042-.528-8.042-1.18 3.799-1.226 8.042-1.226z"/>
            </svg>
          </span>
          
        </Button>
        <Menu className='MyMenuButton-menu'>
          <ul>            
            <li>
              <MenuItem className='MyMenuButton-menuItem'>
                Alle anzeigen
              </MenuItem>
            </li>
            <li>
              <MenuItem className='MyMenuButton-menuItem'>
                Bücher
              </MenuItem>
            </li>
            <li>
              <MenuItem className='MyMenuButton-menuItem'>
                Globus
              </MenuItem>
            </li>
            <li>
              <MenuItem className='MyMenuButton-menuItem'>
                Landkarten
              </MenuItem>
            </li>
            <li>
              <MenuItem className='MyMenuButton-menuItem'>
                Brillen
              </MenuItem>
            </li>
          </ul>
        </Menu>
      </Wrapper>

     {/* GalleryItems */}
     {galleryItems.length > 0 && (
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
     )}

      {galleryItems.length == 0 && (
        <p>nix items</p>
      )}
      
      {/* focusHolderElement */}
      <a
        ref={focusHolderRef} 
        onKeyDown={handleKeyDown}
        tabIndex="-1" 
        role="presentation" 
        aria-hidden="true" 
        id="focus-element">
      </a>

      {
        galleryIsFiltered === false && (
          <button id='show-all' onClick={loadMoreElements}>
            Mehr Bilder anzeigen
          </button>
        )
      }
     
    </div>
  );
};
