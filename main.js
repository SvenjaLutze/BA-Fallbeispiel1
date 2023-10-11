document.addEventListener("DOMContentLoaded", function () {
    const showAllButton = document.getElementById("showAll");
    const filteredImages = document.querySelectorAll(".filtered");
    let allImagesVisible = false;

    showAllButton.addEventListener("click", function () {
        if (allImagesVisible) {
            // Wenn alle Bilder sichtbar sind, ändere die Beschriftung des Buttons und blende die 10 Bilder aus
            for (const image of filteredImages) {
                image.style.display = "none";
            }
            showAllButton.textContent = "Mehr Bilder anzeigen";
            allImagesVisible = false;
        } else {
            // Wenn nicht alle Bilder sichtbar sind, ändere die Beschriftung des Buttons und zeige alle Bilder an
            for (const image of filteredImages) {
                image.style.display = "block";
            }
            showAllButton.textContent = "Weniger Bilder anzeigen";
            allImagesVisible = true;
        }
    });
});
