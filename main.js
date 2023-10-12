document.addEventListener("DOMContentLoaded", function () {
    const showAllButton = document.getElementById("showAll");
    const filteredImages = document.querySelectorAll(".filtered");
    let allImagesVisible = false;

    var elements = document.getElementsByClassName(".filtered");
    var requiredElement = elements[0];

    showAllButton.addEventListener("click", function () {
        if (allImagesVisible) {
            for (const image of filteredImages) {
                image.style.display = "none";
            }
            showAllButton.textContent = "Mehr Bilder anzeigen";
            allImagesVisible = false;
        } else {
            for (const image of filteredImages) {
                image.style.display = "block";
            }
            showAllButton.textContent = "Weniger Bilder anzeigen";
            allImagesVisible = true;

            requiredElement.focus();
        }
    });
});
