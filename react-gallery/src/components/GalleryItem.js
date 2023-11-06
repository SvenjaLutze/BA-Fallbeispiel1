import React from 'react';

export default function GalleryItem({innerRef, src, alt}) {
    return (
        <li>
            <a href="#" ref={innerRef}>
                <img src={src} alt={alt} />
            </a>
        </li>
    )
}