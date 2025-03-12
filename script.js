// JavaScript for Lost & Found System

document.addEventListener("DOMContentLoaded", function () {
    console.log("Lost & Found System Loaded");

    // Mobile Navigation Toggle
    const navToggle = document.createElement("button");
    navToggle.innerText = "☰ Menu";
    navToggle.style.display = "none";
    navToggle.style.background = "#007bff";
    navToggle.style.color = "white";
    navToggle.style.padding = "10px";
    navToggle.style.border = "none";
    navToggle.style.cursor = "pointer";
    navToggle.style.margin = "10px";
    navToggle.style.fontSize = "16px";

    const nav = document.querySelector("nav ul");
    document.querySelector("header").insertBefore(navToggle, nav);

    navToggle.addEventListener("click", function () {
        nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            nav.style.display = "none";
            navToggle.style.display = "block";
        } else {
            nav.style.display = "flex";
            navToggle.style.display = "none";
        }
    }

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Simulated Item Search (Placeholder)
    document.getElementById("searchButton")?.addEventListener("click", function () {
        const searchQuery = document.getElementById("searchInput")?.value.toLowerCase();
        if (searchQuery) {
            alert("Searching for: " + searchQuery);
        }
    });

    // Simulated Lost Item Reporting (Placeholder)
    document.getElementById("reportButton")?.addEventListener("click", function () {
        const itemName = document.getElementById("itemName")?.value;
        const itemDescription = document.getElementById("itemDescription")?.value;
        if (itemName && itemDescription) {
            alert("Item reported: " + itemName);
        }
    });
});
