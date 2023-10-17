const initialGalleryItems = [
    {
        src: '/img/1.jpg',
        alt: 'Eine Tasse Tee auf einem Stapel Bücher'
    },
    {
        src: '/img/2.jpg',
        alt: 'Ein Kompass auf einer Landkarte'
    },
    {
        src: '/img/3.jpg',
        alt: 'Eine Zeitung neben einer Tasse Kaffee, einem Handy und einem Stift'
    },
    {
        src: '/img/4.jpg',
        alt: 'Eine Vielzahl an geöffneten Büchern'
    }
];

const additionalGalleryItems = [
    {
        src: '/img/5.jpg',
        alt: 'Eine goldene Taschenuhr auf einer Landkarte'
    },
    {
        src: '/img/6.jpg',
        alt: 'Ein paar Schuhe, eine Krawatte, ein Notizbuch mit Stift, eine Rolle Geld, ein Feuerzeug und eine Kamera'
    },
    {
        src: '/img/7.jpg',
        alt: 'Eine Kamera auf einer Landkarte und drei Fotos'
    },
    {
        src: '/img/8.jpg',
        alt: 'Ein Notizbuch auf einer Landkarte neben einer Brille und drei Fotos'
    },
    {
        src: '/img/9.jpg',
        alt: 'Ein leuchtender Globus auf einem Schreibtisch'
    },
    {
        src: '/img/10.jpg',
        alt: 'Eine Brille auf einem aufgeschlagenen Buch'
    },
    {
        src: '/img/11.jpg',
        alt: 'Zwei alte Münzen, ein kleiner Schlüssel und ein Kompass auf einer Landkarte'
    },
    {
        src: '/img/12.jpg',
        alt: 'Ein Stapel alter Bücher'
    }
];


document.addEventListener("DOMContentLoaded", function () {
    const showAllButton = document.getElementById("showAll");
    let allImagesVisible = false;
    const gallery = document.querySelector(".gallery");

    showAllButton.addEventListener("click", function () {
        if (allImagesVisible) {
            gallery.innerHTML = '';
            addingImages(initialGalleryItems);
            showAllButton.textContent = "Mehr Bilder anzeigen";
            allImagesVisible = false;
        } else {
            addingImages(additionalGalleryItems);
        }
    });
});

function addingImages(images) {
    for (var i = 0; i < images.length; i++) {
        const currentGalleryItem = images[i];
        const newGalleryEntry = `
            <li>
                <a href="#">
                    <img src="${currentGalleryItem.src}" alt="${currentGalleryItem.alt}">
                </a>
            </li>
        `;

        document.querySelector(".gallery").insertAdjacentHTML('beforeend', newGalleryEntry);
    }
}

addingImages(initialGalleryItems);