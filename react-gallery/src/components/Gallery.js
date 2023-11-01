import React, {Component} from 'react';
import GalleryItem from './GalleryItem';

import initialGalleryItems from '../../../data/initialGallery';
import additionalGalleryItems from '../../../data/additionalGallery';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            galleryItems: initialGalleryItems,
            //status: 'Bilder geladen',
        };
    }

    _loadMoreElements() {
        Gallery.insertAdjacentElement('beforeend', Gallery.focusHolderElement);
        Gallery.focusHolderElement.focus();

        Gallery.state = 'Es werden Bilder geladen';

        setTimeout.state = ({
            galleryItems: additionalGalleryItems,
            status: 'Es wurden Bilder geladen'
        }, 1000)

    }

    _createFocusElement() {
        Gallery.focusHolderElement.setAttribute('tabindex', '-1');
        Gallery.focusHolderElement.setAttribute('role', 'presentation');
        Gallery.focusHolderElement.setAttribute('aria-hidden', 'true');
        Gallery.focusHolderElement.id = 'focus-element';
        
        Gallery.focusHolderElement.addEventListener('blur', function() {
            Gallery.focusHolderElement.remove();
        });
    }

    render() {
        return (
            <div>
                <div id='status'> {this.state.status}</div>
                <button id='show-all' onClick={() => this._loadMoreElements()}>
                    Mehr Bilder anzeigen
                </button>
                <ul className='gallery'>
                    {this.state.galleryItems.map((item, index) => (
                        <GalleryItem key={index} src={item.src} alt={item.alt} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Gallery;