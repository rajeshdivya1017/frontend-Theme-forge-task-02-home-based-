/* =========================================================
   HOMENEST — FAVOURITES
   Shared localStorage favourites
   Header count synchronisation
   Remove / View Property
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const FAVORITES_KEY = "homenest-favourites";

    const favoritesGrid = document.getElementById("favoritesGrid");
    const favoritesEmpty = document.getElementById("favoritesEmpty");
    const favoritesToolbar = document.getElementById("favoritesToolbar");
    const favoritesSort = document.getElementById("favoritesSort");
    const favoritesResultCount = document.getElementById("favoritesResultCount");
    const heroFavoriteCount = document.getElementById("heroFavoriteCount");
    const toastElement = document.getElementById("favoritesToast");

    const pageLoader = document.getElementById("preloader");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const siteHeader = document.getElementById("siteHeader");
    const currentYear = document.getElementById("currentYear");
    const backToTop = document.getElementById("backToTop");

    let toastTimer = null;

    /*
     * Property information is matched by the existing
     * property IDs used in properties.js.
     */
    const propertyData = [
        {
            id: "1",
            title: "Modern Hillside House",
            location: "Beverly Hills, Los Angeles, CA",
            price: 485000,
            type: "Villa",
            bedrooms: 5,
            bathrooms: 4,
            area: 3850,
            image: "assets/properties/modern hill side resorts.webp"
        },
        {
            id: "2",
            title: "Urban Living Apartment",
            location: "Austin, Texas",
            price: 325000,
            type: "Apartment",
            bedrooms: 4,
            bathrooms: 3,
            area: 2650,
            image: "assets/properties/urban living apartment.webp"
        },
        {
            id: "3",
            title: "Serenity Poolside Villa",
            location: "Downtown Miami, Florida",
            price: 675000,
            type: "Villa",
            bedrooms: 2,
            bathrooms: 2,
            area: 1450,
            image: "assets/properties/sernity poolside villa.webp"
        },
        {
            id: "4",
            title: "Coastal Breeze Retreat",
            location: "Plano, Dallas, Texas",
            price: 795000,
            type: "House",
            bedrooms: 4,
            bathrooms: 3,
            area: 2950,
            image: "assets/properties/coastal breeze retreat.webp"
        },
        {
            id: "5",
            title: "Minimalist City Condo",
            location: "Tampa Bay, Florida",
            price: 275000,
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1250,
            image: "assets/properties/minimalist city condos.webp"
        },
        {
            id: "6",
            title: "The Willow Family Home",
            location: "Seattle, Washington",
            price: 415000,
            type: "House",
            bedrooms: 2,
            bathrooms: 2,
            area: 1150,
            image: "assets/properties/willow family home.webp"
        },
        {
            id: "7",
            title: "Skyline View Apartment",
            location: "Portland, Oregon",
            price: 365000,
            type: "Apartment",
            bedrooms: 3,
            bathrooms: 2,
            area: 1850,
            image: "assets/properties/skyline view appartment.webp"
        },
        {
            id: "8",
            title: "Emerald Garden Villa",
            location: "Orlando, Florida",
            price: 725000,
            type: "Villa",
            bedrooms: 5,
            bathrooms: 4,
            area: 3400,
            image: "assets/properties/emereld garden villa.webp"
        },
        {
            id: "9",
            title: "Parkside Modern Condo",
            location: "Brooklyn, New York",
            price: 235000,
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1550,
            image: "assets/properties/parkside mordern combos.webp"
        },
        {
            id: "10",
            title: "Golden Hour Residence",
            location: "Nashville, Tennessee",
            price: 560000,
            type: "House",
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            image: "assets/properties/golden house residency.webp"
        },
        {
            id: "11",
            title: "Riverside City Apartment",
            location: "Chicago, Illinois",
            price: 195000,
            type: "Apartment",
            bedrooms: 3,
            bathrooms: 3,
            area: 2450,
            image: "assets/properties/rever city appartment.webp"
        },
        {
            id: "12",
            title: "Blue Horizon Luxury Villa",
            location: "Phoenix, Arizona",
            price: 950000,
            type: "Villa",
            bedrooms: 3,
            bathrooms: 2,
            area: 1650,
            image: "assets/properties/blue horrizon luxuary villa.webp"
        }
    ];


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function readFavorites() {
        try {
            const parsed = JSON.parse(
                localStorage.getItem(FAVORITES_KEY) || "[]"
            );

            if (!Array.isArray(parsed)) {
                return [];
            }

            return [
                ...new Set(
                    parsed
                        .map((item) => {
                            if (
                                typeof item === "string" ||
                                typeof item === "number"
                            ) {
                                return String(item);
                            }

                            if (
                                item &&
                                (typeof item.id === "string" ||
                                 typeof item.id === "number")
                            ) {
                                return String(item.id);
                            }

                            return "";
                        })
                        .filter((id) => /^\d+$/.test(id))
                )
            ];
        } catch (error) {
            console.error("Unable to read HomeNest favourites:", error);
            return [];
        }
    }


    function writeFavorites(favorites) {
        try {
            localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favorites)
            );

            window.dispatchEvent(
                new CustomEvent("homenest:favorites-updated", {
                    detail: {
                        favorites: [...favorites],
                        count: favorites.length
                    }
                })
            );

            return true;
        } catch (error) {
            console.error("Unable to save HomeNest favourites:", error);
            showToast("Unable to update favourites. Please try again.");
            return false;
        }
    }


    /* =====================================================
       FORMATTERS
    ===================================================== */

    function formatPrice(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(Number(value) || 0);
    }


    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function showToast(message) {
        if (!toastElement) return;

        toastElement.textContent = message;
        toastElement.classList.add("show");

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(() => {
            toastElement.classList.remove("show");
        }, 2600);
    }


    /* =====================================================
       HEADER FAVOURITE COUNT
    ===================================================== */

    function syncHeaderFavorites() {
        const favorites = readFavorites();

        /*
         * Support existing header count elements without
         * requiring the same HTML ID on every page.
         */
        document.querySelectorAll(
            "#favoriteCount, #favoritesCount, [data-favorite-count]"
        ).forEach((element) => {
            element.textContent = String(favorites.length);
        });

        document.querySelectorAll(
            ".favorite-nav-link, [data-favorites-link]"
        ).forEach((link) => {
            link.setAttribute("href", "favorites.html");
            link.setAttribute("aria-label", `View favourites, ${favorites.length} saved`);
            link.setAttribute("title", `Favourites (${favorites.length})`);
        });

        document.querySelectorAll("[data-favorite-id]").forEach((button) => {
            const id = String(button.dataset.favoriteId);
            const isFavorite = favorites.includes(id);

            button.classList.toggle("is-favorite", isFavorite);
            button.classList.toggle("active", isFavorite);
            button.setAttribute("aria-pressed", String(isFavorite));

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-solid", isFavorite);
                icon.classList.toggle("fa-regular", !isFavorite);
            }
        });

        if (heroFavoriteCount) {
            heroFavoriteCount.textContent = String(favorites.length);
        }
    }


    /* =====================================================
       GET SAVED PROPERTIES
    ===================================================== */

    function getSavedProperties() {
        const favoriteIds = readFavorites();

        return favoriteIds
            .map((id, index) => {
                const property = propertyData.find(
                    (item) => item.id === id
                );

                if (!property) return null;

                return {
                    ...property,
                    savedOrder: index
                };
            })
            .filter(Boolean);
    }


    /* =====================================================
       RENDER PROPERTY CARD
    ===================================================== */

    function createFavoriteCard(property) {
        const title = escapeHTML(property.title);
        const location = escapeHTML(property.location);
        const type = escapeHTML(property.type);
        const image = escapeHTML(property.image);
        const id = escapeHTML(property.id);

        return `
            <article class="favorite-property-card"
                     data-property-card="${id}">

                <div class="favorite-card-image-wrap">

                    <img
                        class="favorite-card-image"
                        src="${image}"
                        alt="${title}"
                        loading="lazy"
                        data-property-image
                    >

                    <span class="favorite-card-status">
                        For Sale
                    </span>

                    <button
                        type="button"
                        class="favorite-card-heart"
                        data-remove-favorite="${id}"
                        aria-label="Remove ${title} from favourites"
                        title="Remove from favourites">

                        <i class="fa-solid fa-heart" aria-hidden="true"></i>

                    </button>

                </div>

                <div class="favorite-card-body">

                    <div class="favorite-card-category">
                        <i class="fa-solid fa-house" aria-hidden="true"></i>
                        ${type}
                    </div>

                    <h3 class="favorite-card-title">
                        <a href="property-details.html?id=${id}">
                            ${title}
                        </a>
                    </h3>

                    <p class="favorite-card-location">
                        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                        <span>${location}</span>
                    </p>

                    <div class="favorite-card-features">

                        <span class="favorite-card-feature">
                            <i class="fa-solid fa-bed" aria-hidden="true"></i>
                            ${property.bedrooms} Beds
                        </span>

                        <span class="favorite-card-feature">
                            <i class="fa-solid fa-bath" aria-hidden="true"></i>
                            ${property.bathrooms} Baths
                        </span>

                        <span class="favorite-card-feature">
                            <i class="fa-solid fa-ruler-combined" aria-hidden="true"></i>
                            ${Number(property.area).toLocaleString("en-IN")} sq.ft.
                        </span>

                    </div>

                    <div class="favorite-card-footer">

                        <div class="favorite-card-price">
                            <span>Listed price</span>
                            <strong>${formatPrice(property.price)}</strong>
                        </div>

                        <a
                            class="favorite-card-action"
                            href="property-details.html?id=${id}">

                            View Details
                            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>

                        </a>

                    </div>

                </div>

            </article>
        `;
    }


    /* =====================================================
       SORTING
    ===================================================== */

    function sortProperties(properties) {
        const sortValue = favoritesSort?.value || "newest";
        const sorted = [...properties];

        if (sortValue === "price-low") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortValue === "price-high") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortValue === "name") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            sorted.sort((a, b) => a.savedOrder - b.savedOrder);
        }

        return sorted;
    }


    /* =====================================================
       RENDER FAVOURITES
    ===================================================== */

    function renderFavorites() {
        const savedProperties = getSavedProperties();
        const count = savedProperties.length;

        syncHeaderFavorites();

        if (favoritesResultCount) {
            favoritesResultCount.textContent = String(count);
        }

        if (heroFavoriteCount) {
            heroFavoriteCount.textContent = String(count);
        }

        if (favoritesToolbar) {
            favoritesToolbar.hidden = count === 0;
        }

        if (favoritesEmpty) {
            favoritesEmpty.hidden = count !== 0;
        }

        if (!favoritesGrid) return;

        if (count === 0) {
            favoritesGrid.innerHTML = "";
            return;
        }

        favoritesGrid.innerHTML = sortProperties(savedProperties)
            .map(createFavoriteCard)
            .join("");

        favoritesGrid.querySelectorAll("[data-property-image]").forEach((image) => {
            image.addEventListener("error", () => {
                image.onerror = null;
                image.src = "assets/images/property-1.jpg";
            }, { once: true });
        });
    }


    /* =====================================================
       REMOVE FAVOURITE
    ===================================================== */

    function removeFavorite(id) {
        const favorites = readFavorites();
        const updatedFavorites = favorites.filter(
            (favoriteId) => favoriteId !== String(id)
        );

        if (updatedFavorites.length === favorites.length) {
            return;
        }

        if (!writeFavorites(updatedFavorites)) {
            return;
        }

        renderFavorites();
        showToast("Property removed from your favourites.");
    }


    if (favoritesGrid) {
        favoritesGrid.addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-favorite]");

            if (!button) return;

            removeFavorite(button.dataset.removeFavorite);
        });
    }


    favoritesSort?.addEventListener("change", renderFavorites);


    /* =====================================================
       SYNC AFTER CHANGES ON OTHER PAGES / TABS
    ===================================================== */

    window.addEventListener("storage", (event) => {
        if (event.key === FAVORITES_KEY || event.key === null) {
            renderFavorites();
        }
    });

    window.addEventListener("homenest:favorites-updated", () => {
        renderFavorites();
    });

    window.addEventListener("pageshow", () => {
        renderFavorites();
    });

    window.addEventListener("focus", () => {
        renderFavorites();
    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open", "active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                navMenu.classList.contains("open") ||
                navMenu.classList.contains("active");

            navMenu.classList.toggle("open", !isOpen);
            navMenu.classList.toggle("active", !isOpen);

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation menu" : "Close navigation menu"
            );
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {
        if (siteHeader) {
            siteHeader.classList.toggle("scrolled", window.scrollY > 15);
        }
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();


    /* =====================================================
       FOOTER YEAR / BACK TO TOP
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function updateBackToTop() {
        if (backToTop) {
            backToTop.classList.toggle("visible", window.scrollY > 400);
        }
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
        });
    });


    /* =====================================================
       PRELOADER
    ===================================================== */

    function hidePreloader() {
        if (!pageLoader) return;

        pageLoader.classList.add("hidden", "is-hidden");
        pageLoader.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-loading");
    }

    const skipLoader = sessionStorage.getItem("stacklySkipLoader");

    if (skipLoader === "1" || skipLoader === "true") {
        sessionStorage.removeItem("stacklySkipLoader");
        hidePreloader();
    } else {
        window.addEventListener("load", () => {
            window.setTimeout(hidePreloader, 200);
        }, { once: true });

        window.setTimeout(hidePreloader, 1800);
    }


    /* =====================================================
       INTERNAL NAVIGATION LOADER SKIP
    ===================================================== */

    document.querySelectorAll('a[href$=".html"], a[href*=".html?"]').forEach((link) => {
        link.addEventListener("click", () => {
            const url = new URL(link.href, window.location.href);

            if (
                url.origin === window.location.origin &&
                url.pathname !== window.location.pathname
            ) {
                sessionStorage.setItem("stacklySkipLoader", "1");
            }
        });
    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderFavorites();
});