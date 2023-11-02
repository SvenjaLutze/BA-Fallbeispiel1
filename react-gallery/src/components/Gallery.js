import React, {Component} from 'react';
import GalleryItem from './GalleryItem';

import initialGalleryItems from '../data/initialGallery';
import additionalGalleryItems from '../data/additionalGallery';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            galleryItems: initialGalleryItems,
            status: '',
            searchString: '',
        };

        this.focusHolderRef = React.createRef();
    }

    componentDidMount() {
        this._createFocusElement();
    }

    _loadMoreElements() {
        Gallery.insertAdjacentElement('beforeend', Gallery.focusHolderElement);
        Gallery.focusHolderElement.focus();

        Gallery.setState({status: 'Es werden Bilder geladen'});
        
        setTimeout(() => {
            Gallery.setState({
              galleryItems: [...initialGalleryItems, ...additionalGalleryItems],
              status: 'Es wurden Bilder geladen'
            });
        }, 1000);
           
    }

    _createFocusElement() {
        const focusHolderElement = Gallery.focusHolderRef.current;
        focusHolderElement.setAttribute('tabIndex', -1);
        focusHolderElement.setAttribute('role', 'presentation');
        focusHolderElement.setAttribute('aria-hidden', 'true');
        focusHolderElement.id = 'focus-element';

        focusHolderElement.addEventListener('blur', () => {
            focusHolderElement.remove();
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
                <div ref={this.focusHolderRef}></div>
            </div>
        );
    }
}

export default Gallery;