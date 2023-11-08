import initialGalleryItems from './data/initialGallery.js';
import additionalGalleryItems from './data/additionalGallery.js';

const Gallery = {

    /**
     * Collects necessary elements.
     * @function _cacheElements
     * @private
    */
    _cacheElements: function () {
        this.statusElement = document.getElementById('status');
        this.showAllButton = document.getElementById('show-all');
        this.gallery = document.querySelector('.gallery');
        this.galleryItems = null;
        this.focusHolderElement = document.createElement('li');
        this.searchBox = document.querySelector('#search-box');
    },

    /**
     * Binds all events.
     * @function _bindEvents
     * @private
    */
    _bindEvents: function () {
        Gallery.showAllButton.addEventListener("click", function () {
            Gallery._loadMoreElements();
        });

        Gallery.searchBox.addEventListener("input", function () {
            Gallery._filterGallery();
        });

        Gallery.searchBox.addEventListener("focus", function () {
            Gallery._setStatus("Das Suchfeld wurde ausgewählt. Geben Sie einen Suchbegriff ein.");
        });
    },

    _loadMoreElements: function() {
        Gallery.gallery.insertAdjacentElement('beforeend', Gallery.focusHolderElement);
        Gallery.focusHolderElement.focus();

        Gallery._setStatus('Es werden Bilder geladen');

        setTimeout(() => {
            Gallery._addImages(additionalGalleryItems);
            Gallery._setStatus('Es wurden Bilder geladen');
        }, 1000)
    },

    _createFocusElement: function() {
        Gallery.focusHolderElement.setAttribute('tabindex', '-1')
        Gallery.focusHolderElement.setAttribute('role', 'presentation');
        Gallery.focusHolderElement.setAttribute('aria-hidden', 'true');
        Gallery.focusHolderElement.id = 'focus-element';
        
        Gallery.focusHolderElement.addEventListener('blur', function() {
            Gallery.focusHolderElement.remove();
        });
    },

    _addImages: function(images) {
        for (var i = 0; i < images.length; i++) {
            const currentGalleryItem = images[i];
            const newGalleryEntry = `
                <li>
                    <a href="#">
                        <img src="${currentGalleryItem.src}" alt="${currentGalleryItem.alt}" data-tags="${currentGalleryItem.tags}">
                    </a>
                </li>
            `;

            document.querySelector(".gallery").insertAdjacentHTML('beforeend', newGalleryEntry);
        }

        Gallery.galleryItems = Gallery.gallery.querySelectorAll('li:not(#focus-element)');
    },

    _filterGallery: function() {
        let searchString = Gallery.searchBox.value;
        
        Gallery.galleryItems.forEach(listItem =>{
            let tagList = listItem.querySelector('img').getAttribute('data-tags').split(","); 
            
            let matchFound = tagList.some(tag => tag.includes(searchString));

            if (matchFound) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    },

    _setStatus: function(statusMessage) {
        Gallery.statusElement.textContent = statusMessage;
    },

    init: function() {
        if (document.querySelector('.gallery')) {
            Gallery._cacheElements();
            Gallery._createFocusElement();
            Gallery._addImages(initialGalleryItems); 
            Gallery._bindEvents();
        }
    }
}

Gallery.init();