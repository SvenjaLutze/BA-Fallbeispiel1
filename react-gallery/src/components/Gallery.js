import React, {Component} from 'react';
import GalleryItem from './GalleryItem.js';
import Filter from './Filter.js';

import initialGalleryItems from '../data/initialGallery.js';
import additionalGalleryItems from '../data/additionalGallery.js';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            galleryItems: initialGalleryItems,  // first four images
            currentIndex: 0,    // current index in additionalGallery.js
            status: '',
        };

        this.focusHolderRef = React.createRef();
    }

    componentDidMount() {
        this._createFocusElement(); // componentDidMount method is invoked after all the elements of the page have been rendered correctly
    }

    
    _loadMoreElements() {
        this.setState({ status: 'Es werden Bilder geladen' });
    
        setTimeout(() => {
          const { galleryItems } = this.state;
          const nextGalleryItems = [...galleryItems, ...additionalGalleryItems];
    
          this.setState({
            galleryItems: nextGalleryItems,
            status: 'Es wurden Bilder geladen', // Status aktualisieren
          });
    
          this.focusHolderRef.current.focus();
        }, 1000);
    }    
    

    _createFocusElement() {
        const focusHolderElement = this.focusHolderRef.current;
        if (focusHolderElement) {
            focusHolderElement.setAttribute('tabIndex', -1);
            focusHolderElement.setAttribute('role', 'presentation');
            focusHolderElement.setAttribute('aria-hidden', 'true');
            focusHolderElement.id = 'focus-element';

            focusHolderElement.addEventListener('blur', () => {
                focusHolderElement.remove();
            });
        }
    }

    _handleFilterChange = (searchString) => {
        const filteredGallery = initialGalleryItems.filter(item => {
          const tagList = item.tags.split(',');
          return tagList.some(tag => tag.includes(searchString));
        });
    }

    render() {
        return (
            <div>
                <div className="container"></div>
                <div id='status' aria-atomic="true" className='sr-only'>{this.state.status}</div>
                <h1>Vintage Bildergalerie</h1>
                
                <Filter onFilterChange={this._handleFilterChange} />

                <ul className='gallery'>
                    {this.state.galleryItems.map((item, index) => (
                        <GalleryItem key={index} src={item.src} alt={item.alt} />
                    ))}
                </ul>

                <button id='show-all' onClick={() => this._loadMoreElements()}>
                    Mehr Bilder anzeigen
                </button>

                <div ref={this.focusHolderRef}></div>
            </div>
        );
    }
}

export default Gallery;