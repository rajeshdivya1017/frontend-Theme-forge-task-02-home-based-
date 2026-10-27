
/* =========================================
   STACKLY - PROPERTY DETAILS
   Gallery, favourites, map, booking, navigation
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const properties = [
        {
            id: 1,
            title: "Modern Luxury Villa",
            location: "Beverly Hills, Los Angeles, CA",
            price: 1250000,
            type: "Villa",
            status: "For Sale",
            bedrooms: 5,
            bathrooms: 4,
            area: 3850,
            parking: 2,
            year: 2023,
            description: "Experience refined living in this modern luxury villa, featuring spacious interiors, elegant finishes, abundant natural light, and thoughtfully designed living spaces. Enjoy a private outdoor area and a welcoming atmosphere ideal for comfortable everyday living and entertaining guests.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Fitness Center", "Swimming Pool", "Smart Home"],
            images: [
                "assets/properties/modern hill side resorts.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 02.webp"
            ]
        },
        {
            id: 2,
            title: "Contemporary Family Home",
            location: "Austin, Texas",
            price: 685000,
            type: "House",
            status: "For Sale",
            bedrooms: 4,
            bathrooms: 3,
            area: 2650,
            parking: 2,
            year: 2022,
            description: "This contemporary family home combines functional design with comfortable living spaces. Enjoy a bright living room, a well-planned kitchen, spacious bedrooms, and an inviting outdoor area. Its practical layout makes it a great choice for families seeking a modern home.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Smart Home"],
            images: [
                "assets/properties/urban living apartment.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 01.webp"
            ]
        },
        {
            id: 3,
            title: "Premium City Apartment",
            location: "Downtown Miami, Florida",
            price: 425000,
            type: "Apartment",
            status: "For Sale",
            bedrooms: 2,
            bathrooms: 2,
            area: 1450,
            parking: 1,
            year: 2024,
            description: "Discover urban living in this premium city apartment. The open-plan interior, modern kitchen, and comfortable bedrooms create a practical and stylish living environment. Conveniently located near dining, shopping, and entertainment options.",
            amenities: ["High-Speed Wi-Fi", "Covered Parking", "24/7 Security", "Air Conditioning", "Fitness Center", "Swimming Pool", "Elevator"],
            images: [
                "assets/properties/sernity poolside villa.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        },
        {
            id: 4,
            title: "Elegant Suburban Residence",
            location: "Plano, Dallas, Texas",
            price: 795000,
            type: "House",
            status: "For Sale",
            bedrooms: 4,
            bathrooms: 3,
            area: 2950,
            parking: 2,
            year: 2021,
            description: "A welcoming suburban residence with generous living spaces, a modern kitchen, comfortable bedrooms, and a private garden. Designed to balance privacy and convenience, this home offers an inviting setting for everyday family life.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Smart Home"],
            images: [
                "assets/properties/coastal breeze retreat.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 01.webp"
            ]
        },
        {
            id: 5,
            title: "Waterfront Luxury Estate",
            location: "Tampa Bay, Florida",
            price: 1850000,
            type: "Villa",
            status: "For Sale",
            bedrooms: 5,
            bathrooms: 4,
            area: 4200,
            parking: 3,
            year: 2023,
            description: "Enjoy an exceptional lifestyle in this waterfront-inspired luxury estate. Expansive living areas, refined interior details, and generous outdoor spaces create an ideal setting for relaxation and entertaining.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Fitness Center", "Swimming Pool", "Smart Home"],
            images: [
                "assets/properties/minimalist city condos.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        },
        {
            id: 6,
            title: "Minimalist Modern Apartment",
            location: "Seattle, Washington",
            price: 385000,
            type: "Apartment",
            status: "For Sale",
            bedrooms: 2,
            bathrooms: 1,
            area: 1150,
            parking: 1,
            year: 2022,
            description: "A thoughtfully designed apartment featuring a clean modern aesthetic, efficient use of space, and bright interiors. A practical choice for anyone looking for comfortable city living with convenient access to local amenities.",
            amenities: ["High-Speed Wi-Fi", "Covered Parking", "24/7 Security", "Air Conditioning", "Fitness Center", "Elevator"],
            images: [
                "assets/properties/willow family home.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 01.webp"
            ]
        },
        {
            id: 7,
            title: "Charming Garden Townhouse",
            location: "Portland, Oregon",
            price: 515000,
            type: "Townhouse",
            status: "For Sale",
            bedrooms: 3,
            bathrooms: 2,
            area: 1850,
            parking: 1,
            year: 2020,
            description: "This charming townhouse combines a practical multi-level layout with a relaxing garden area. Bright rooms, comfortable bedrooms, and a welcoming living space make it a lovely place to settle in.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Smart Home"],
            images: [
                "assets/properties/skyline view appartment.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp"
            ]
        },
        {
            id: 8,
            title: "Spacious Family Villa",
            location: "Orlando, Florida",
            price: 925000,
            type: "Villa",
            status: "For Sale",
            bedrooms: 5,
            bathrooms: 4,
            area: 3400,
            parking: 2,
            year: 2023,
            description: "A spacious villa designed around family comfort, with generous bedrooms, an open living area, and inviting outdoor space. Its modern features and flexible layout provide room to relax, work, and entertain.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Fitness Center", "Swimming Pool"],
            images: [
                "assets/properties/emereld garden villa.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        },
        {
            id: 9,
            title: "Urban Loft Residence",
            location: "Brooklyn, New York",
            price: 645000,
            type: "Apartment",
            status: "For Sale",
            bedrooms: 2,
            bathrooms: 2,
            area: 1550,
            parking: 1,
            year: 2021,
            description: "This urban loft offers an open and versatile living space with contemporary finishes and an airy feel. Enjoy a practical layout suited to modern city living, with dining, shopping, and transportation options nearby.",
            amenities: ["High-Speed Wi-Fi", "Covered Parking", "24/7 Security", "Air Conditioning", "Fitness Center", "Elevator"],
            images: [
                "assets/properties/parkside mordern combos.webp",
                "assets/booking details/image 03.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp"
            ]
        },
        {
            id: 10,
            title: "Peaceful Country Home",
            location: "Nashville, Tennessee",
            price: 575000,
            type: "House",
            status: "For Sale",
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            parking: 2,
            year: 2019,
            description: "A peaceful home with a warm atmosphere, spacious interiors, and a private outdoor setting. The balanced layout and comfortable living areas create a relaxing retreat while keeping daily essentials within reach.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Smart Home"],
            images: [
                "assets/properties/golden house residency.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        },
        {
            id: 11,
            title: "Executive Penthouse",
            location: "Chicago, Illinois",
            price: 1125000,
            type: "Penthouse",
            status: "For Sale",
            bedrooms: 3,
            bathrooms: 3,
            area: 2450,
            parking: 2,
            year: 2024,
            description: "Discover elevated city living in this executive penthouse. Spacious interiors, modern finishes, and a carefully planned layout create a sophisticated environment for relaxing and entertaining.",
            amenities: ["High-Speed Wi-Fi", "Covered Parking", "24/7 Security", "Air Conditioning", "Fitness Center", "Swimming Pool", "Elevator"],
            images: [
                "assets/properties/rever city appartment.webp",
                "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        },
        {
            id: 12,
            title: "Modern Starter Home",
            location: "Phoenix, Arizona",
            price: 345000,
            type: "House",
            status: "For Sale",
            bedrooms: 3,
            bathrooms: 2,
            area: 1650,
            parking: 2,
            year: 2022,
            description: "A modern and practical home with comfortable living areas, a functional kitchen, and well-planned bedrooms. An attractive option for buyers seeking an approachable entry into homeownership.",
            amenities: ["High-Speed Wi-Fi", "Private Parking", "24/7 Security", "Air Conditioning", "Garden", "Smart Home"],
            images: [
                "assets/properties/blue horrizon luxuary villa.webp",
               "assets/booking details/image 01.webp",
                "assets/booking details/image 02.webp",
                "assets/booking details/image 03.webp"
            ]
        }
    ];

    const $ = (id) => document.getElementById(id);
    const setText = (id, value) => {
        const element = $(id);
        if (element) element.textContent = value;
    };

    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = Number(urlParams.get("id"));
    const property = properties.find((item) => item.id === requestedId);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(price);

    const formatNumber = (number) =>
        new Intl.NumberFormat("en-US").format(number);

    /* PRELOADER */
    const preloader = $("preloader");
    let loaderHidden = false;

    function hidePreloader() {
        if (loaderHidden) return;
        loaderHidden = true;
        if (preloader) {
            preloader.classList.add("hidden", "is-hidden");
            preloader.setAttribute("aria-hidden", "true");
        }
        document.body.classList.remove("is-loading");
    }

    if (sessionStorage.getItem("stacklySkipLoader") === "1") {
        sessionStorage.removeItem("stacklySkipLoader");
        hidePreloader();
    } else {
        window.addEventListener("load", () => window.setTimeout(hidePreloader, 220), { once: true });
        window.setTimeout(hidePreloader, 1800);
    }

    /* FOOTER YEAR */
    setText("currentYear", new Date().getFullYear());

    /* TOAST */
    let toastTimer;
    function showToast(message, isError = false) {
        const container = $("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast${isError ? " is-error" : ""}`;
        toast.innerHTML = `<i class="fa-solid ${isError ? "fa-circle-exclamation" : "fa-circle-check"}" aria-hidden="true"></i><span></span>`;
        toast.querySelector("span").textContent = message;
        container.appendChild(toast);

        window.setTimeout(() => toast.remove(), 3000);
    }

    /* PROPERTY NOT FOUND */
    function showPropertyNotFound() {
        const container = $("propertyDetailsContainer");
        if (!container) return;

        container.innerHTML = `
            <div class="property-not-found">
                <i class="fa-solid fa-house-circle-exclamation" aria-hidden="true"></i>
                <h2>Property Not Found</h2>
                <p>We couldn't find this property. Please return to the properties page and choose a listing.</p>
                <a href="properties.html" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                    Browse Properties
                </a>
            </div>`;
        document.title = "Property Not Found | Stackly";
    }

    /* RENDER PROPERTY */
    function renderPropertyDetails() {
        if (!property) {
            showPropertyNotFound();
            return;
        }

        document.title = `${property.title} | Stackly`;
        setText("breadcrumbProperty", property.title);
        setText("propertyTitle", property.title);
        setText("propertyLocation", property.location);
        setText("propertyStatus", property.status);
        setText("propertyBedrooms", property.bedrooms);
        setText("propertyBathrooms", property.bathrooms);
        setText("propertyArea", formatNumber(property.area));
        setText("propertyParking", property.parking);
        setText("propertyDescription", property.description);
        setText("propertyId", `HN-${String(property.id).padStart(3, "0")}`);
        setText("propertyType", property.type);
        setText("overviewStatus", property.status);
        setText("propertyYear", property.year);
        setText("propertyPrice", formatPrice(property.price));
        setText("sidebarType", property.type);
        setText("sidebarBedrooms", property.bedrooms);
        setText("sidebarArea", `${formatNumber(property.area)} sq.ft.`);
        setText("mapLocationTitle", property.location);
        setText("mapLocationText", `Explore the neighborhood around ${property.location}.`);

        const mapQuery = encodeURIComponent(property.location);
        const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
        const mapFrame = $("propertyMap");
        const mapLink = $("mapLink");

        if (mapFrame) mapFrame.src = mapUrl;
        if (mapLink) {
            mapLink.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
        }

        const bookButton = $("bookViewingButton");
        if (bookButton) {
            bookButton.href = `booking.html?id=${property.id}`;
        }

        renderAmenities();
        renderGallery();
        updateFavoriteButton();
    }

    /* AMENITIES */
    function renderAmenities() {
        const grid = $("amenitiesGrid");
        if (!grid || !property) return;

        const icons = {
            "High-Speed Wi-Fi": "fa-wifi",
            "Private Parking": "fa-car",
            "Covered Parking": "fa-square-parking",
            "24/7 Security": "fa-shield-halved",
            "Air Conditioning": "fa-snowflake",
            "Garden": "fa-tree",
            "Fitness Center": "fa-dumbbell",
            "Swimming Pool": "fa-person-swimming",
            "Smart Home": "fa-house-signal",
            "Elevator": "fa-elevator"
        };

        grid.innerHTML = property.amenities.map((amenity) => `
            <div class="amenity-item">
                <i class="fa-solid ${icons[amenity] || "fa-check"}" aria-hidden="true"></i>
                <span>${amenity}</span>
            </div>`).join("");
    }

    /* GALLERY */
    let currentImageIndex = 0;

    function updateGalleryImage(index) {
        if (!property || !property.images[index]) return;

        currentImageIndex = index;
        const image = $("mainPropertyImage");

        if (image) {
            image.src = property.images[index];
            image.alt = `${property.title} - Image ${index + 1}`;
        }

        const count = $("imageCount");
        if (count) {
            count.innerHTML = `<i class="fa-regular fa-images" aria-hidden="true"></i> ${index + 1} / ${property.images.length}`;
        }

        document.querySelectorAll(".gallery-thumbnail").forEach((button, buttonIndex) => {
            const active = buttonIndex === index;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function renderGallery() {
        if (!property) return;
        const thumbnails = $("galleryThumbnails");
        if (!thumbnails) return;

        thumbnails.innerHTML = property.images.map((image, index) => `
            <button class="gallery-thumbnail${index === 0 ? " active" : ""}"
                    type="button"
                    data-index="${index}"
                    aria-label="View property image ${index + 1}"
                    aria-pressed="${index === 0}">
                <img src="${image}" alt="${property.title} thumbnail ${index + 1}" loading="lazy">
            </button>`).join("");

        updateGalleryImage(0);

        thumbnails.addEventListener("click", (event) => {
            const button = event.target.closest(".gallery-thumbnail");
            if (button) updateGalleryImage(Number(button.dataset.index));
        });

        $("galleryPrev")?.addEventListener("click", () => {
            updateGalleryImage((currentImageIndex - 1 + property.images.length) % property.images.length);
        });

        $("galleryNext")?.addEventListener("click", () => {
            updateGalleryImage((currentImageIndex + 1) % property.images.length);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                updateGalleryImage((currentImageIndex - 1 + property.images.length) % property.images.length);
            } else if (event.key === "ArrowRight") {
                updateGalleryImage((currentImageIndex + 1) % property.images.length);
            }
        });
    }

    /* FAVOURITES */
    const FAVORITES_KEY = "homenest-favourites";

    function getFavorites() {
        try {
            const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
            if (!Array.isArray(saved)) return [];

            return saved.map((item) => {
                if (typeof item === "number") return item;
                if (typeof item === "string") return Number(item);
                if (item && (typeof item.id === "number" || typeof item.id === "string")) return Number(item.id);
                return NaN;
            }).filter(Number.isFinite);
        } catch (error) {
            console.error("Unable to read favourites:", error);
            return [];
        }
    }

    function updateFavoriteButton() {
        const button = $("favoriteButton");
        if (!button || !property) return;

        const isFavorite = getFavorites().includes(property.id);
        const icon = button.querySelector("i");

        button.classList.toggle("is-favorite", isFavorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute("aria-label", isFavorite ? "Remove property from favourites" : "Add property to favourites");

        if (icon) icon.className = isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart";
    }

    function toggleFavorite() {
        if (!property) return;

        const favorites = getFavorites();
        const isFavorite = favorites.includes(property.id);
        const updated = isFavorite ? favorites.filter((id) => id !== property.id) : [...favorites, property.id];

        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
            updateFavoriteButton();
            showToast(isFavorite ? "Property removed from favourites." : "Property added to favourites.");

            window.dispatchEvent(new CustomEvent("homenest:favorites-updated", {
                detail: { propertyId: property.id, isFavorite: !isFavorite }
            }));
        } catch (error) {
            console.error("Unable to save favourite:", error);
            showToast("Unable to update favourites. Please try again.", true);
        }
    }

    $("favoriteButton")?.addEventListener("click", toggleFavorite);
    window.addEventListener("storage", (event) => {
        if (event.key === FAVORITES_KEY) updateFavoriteButton();
    });

    /* SHARE */
    async function shareProperty() {
        if (!property) return;

        const data = {
            title: property.title,
            text: `${property.title} - ${property.location} - ${formatPrice(property.price)}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(data);
            } else if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(data.url);
                showToast("Property link copied!");
            } else {
                showToast("Copy this page's URL to share the property.");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Unable to share property:", error);
                showToast("Unable to share this property.", true);
            }
        }
    }

    $("shareButton")?.addEventListener("click", shareProperty);

    /* MOBILE NAVIGATION */
    const menuToggle = $("menuToggle");
    const navMenu = $("navMenu");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;
        navMenu.classList.remove("open", "is-open");
        menuToggle.classList.remove("is-active", "open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    function openMenu() {
        if (!menuToggle || !navMenu) return;
        navMenu.classList.add("open");
        menuToggle.classList.add("is-active");
        document.body.classList.add("menu-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.contains("open") ? closeMenu() : openMenu();
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) closeMenu();
        });
    }

    /* HEADER SCROLL */
    const header = $("siteHeader");
    function updateHeader() {
        if (header) header.classList.toggle("scrolled", window.scrollY > 15);
    }
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    /* REVEAL */
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible", "is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible", "is-visible"));
    }

    /* BACK TO TOP */
    const backToTop = $("backToTop");
    function updateBackToTop() {
        if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 450);
    }
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        });
    });

    /* FOOTER NEWSLETTER */
    const subscribeForm = $("footerSubscribe");
    subscribeForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = $("subscribeEmail");
        if (!emailInput || !emailInput.checkValidity()) {
            emailInput?.reportValidity();
            return;
        }
        showToast("Thanks! Property updates signup is ready to connect.");
        subscribeForm.reset();
    });

    /* SAME-PAGE NAVIGATION LOADER SKIP */
    document.querySelectorAll('a[href$=".html"], a[href*=".html?"]').forEach((link) => {
        link.addEventListener("click", () => {
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
                sessionStorage.setItem("stacklySkipLoader", "1");
            }
        });
    });

    /* INITIALIZE */
    renderPropertyDetails();
});

/* =========================================
   GLOBAL FAVOURITES NAV COUNT
   Stackly — Property Details
========================================= */

function updateFavoritesNavCount() {
    const FAVORITES_KEY = "homenest-favourites";

    let favorites = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

        if (Array.isArray(saved)) {
            favorites = [
                ...new Set(
                    saved.map((item) => {
                        if (
                            item &&
                            typeof item === "object" &&
                            item.id !== undefined
                        ) {
                            return String(item.id);
                        }

                        return String(item);
                    })
                )
            ];
        }
    } catch (error) {
        console.error(
            "Unable to read favourites:",
            error
        );
    }

    /* Update the count only inside the navigation heart */
    document.querySelectorAll(
        ".favorite-nav-link .favorite-count, " +
        ".favorite-nav-link [data-favorite-count]"
    ).forEach((countElement) => {
        countElement.textContent = String(favorites.length);
    });

    /* Ensure the navigation heart opens the favourites page */
    document.querySelectorAll(
        ".favorite-nav-link, [data-favorites-link]"
    ).forEach((link) => {
        link.href = "favorites.html";

        link.setAttribute(
            "aria-label",
            `View favourites, ${favorites.length} saved`
        );

        link.setAttribute(
            "title",
            `Favourites (${favorites.length})`
        );
    });
}

/* Initial count */
updateFavoritesNavCount();

/* Favourites changed in another tab */
window.addEventListener("storage", (event) => {
    if (
        event.key === "homenest-favourites" ||
        event.key === null
    ) {
        updateFavoritesNavCount();
        updateFavoriteButton();
    }
});

/* Favourites changed in the current tab */
window.addEventListener(
    "homenest:favorites-updated",
    () => {
        updateFavoritesNavCount();
        updateFavoriteButton();
    }
);

/* Update when returning to this page */
window.addEventListener(
    "pageshow",
    updateFavoritesNavCount
);