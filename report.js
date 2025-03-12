document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("report-form");
    const requestForm = document.getElementById("request-form");
    const imageInput = document.getElementById("item-image");

    // Image preview before upload
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgPreview = document.createElement("img");
                imgPreview.src = e.target.result;
                imgPreview.style.maxWidth = "100px";
                imgPreview.style.marginTop = "10px";

                // Remove old preview if exists
                const oldPreview = document.getElementById("image-preview");
                if (oldPreview) {
                    oldPreview.remove();
                }

                imgPreview.id = "image-preview";
                imageInput.insertAdjacentElement("afterend", imgPreview);
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle report submission
    reportForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const itemName = document.getElementById("item-name").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        const dateLost = document.getElementById("date-lost").value;
        const imageFile = imageInput.files[0];

        if (!itemName || !category || !description || !dateLost || !imageFile) {
            alert("Please fill in all fields and upload an image.");
            return;
        }

        // Convert image to Base64
        const reader = new FileReader();
        reader.onload = function () {
            const lostItem = {
                itemName,
                category,
                description,
                dateLost,
                image: reader.result, // Store Base64 string
            };

            // Save to local storage (temporary)
            const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
            lostItems.push(lostItem);
            localStorage.setItem("lostItems", JSON.stringify(lostItems));

            alert("Lost item reported successfully!");
            reportForm.reset();

            // Remove image preview
            const imgPreview = document.getElementById("image-preview");
            if (imgPreview) imgPreview.remove();
        };
        reader.readAsDataURL(imageFile);
    });

    // Handle request search (mock search for now)
    requestForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const searchName = document.getElementById("search-name").value.toLowerCase();
        const searchCategory = document.getElementById("search-category").value;
        const searchDescription = document.getElementById("search-description").value.toLowerCase();

        const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];

        const foundItem = lostItems.find(item => 
            item.itemName.toLowerCase().includes(searchName) &&
            item.category === searchCategory &&
            item.description.toLowerCase().includes(searchDescription)
        );

        if (foundItem) {
            alert(`Item found: ${foundItem.itemName} (Lost on ${foundItem.dateLost})`);
            const resultImage = document.createElement("img");
            resultImage.src = foundItem.image;
            resultImage.style.maxWidth = "150px";
            document.body.appendChild(resultImage);
        } else {
            alert("No matching item found.");
        }
    });
});
