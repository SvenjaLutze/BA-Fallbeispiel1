import React from 'react';

function GalleryItem({ src, alt}) {
    return (
        <li>
            <a href="#">
                <img src={src} alt={alt} />
            </a>
        </li>
    )
}

export default GalleryItem;