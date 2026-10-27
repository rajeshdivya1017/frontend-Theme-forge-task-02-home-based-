/* =========================================
   HOMENEST - PROPERTIES PAGE
   Search, Filters, Sorting, Favourites
   Vanilla JavaScript
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const backToTop = document.getElementById("backToTop");

    const listingSearch = document.getElementById("listingSearch");
    const locationInput = document.getElementById("locationInput");
    const typeFilter = document.getElementById("typeFilter");
    const priceFilter = document.getElementById("priceFilter");
    const sortFilter = document.getElementById("sortFilter");

    const propertyGrid = document.getElementById("propertyGrid");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("emptyState");
    const pagination = document.getElementById("pagination");
    const activeFilters = document.getElementById("activeFilters");

    const clearFiltersButton = document.getElementById("clearFilters");
    const resetSearchButton = document.getElementById("resetSearch");

    const gridViewButton = document.getElementById("gridViewButton");
    const listViewButton = document.getElementById("listViewButton");

    const favoritesFilter = document.getElementById("favoritesFilter");
    const favoriteCount = document.getElementById("favoriteCount");

    const toastContainer = document.getElementById("toastContainer");
    const currentYear = document.getElementById("currentYear");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const ITEMS_PER_PAGE = 6;

    let currentPage = 1;
    let showOnlyFavorites = false;
    let currentView = "grid";

    let filters = {
        location: "",
        type: "",
        maxPrice: null
    };

    /* =====================================
       PROPERTY DEMO DATA
    ===================================== */

    const properties = [
        {
            id: "1",
            name: "Modern Hillside House",
            location: "Beverly Hills, California",
            type: "house",
            price: 485000,
            beds: 4,
            baths: 3,
            area: 2450,
            images: 12,
            badge: "Featured",
            badgeClass: "",
            image: "assets/properties/modern hill side resorts.webp",
            featured: true
        },
        {
            id: "2",
            name: "Urban Living Apartment",
            location: "Brooklyn, New York",
            type: "apartment",
            price: 325000,
            beds: 2,
            baths: 2,
            area: 1280,
            images: 9,
            badge: "New Listing",
            badgeClass: "badge-new",
            image: "assets/properties/urban living apartment.webp",
            featured: true
        },
        {
            id: "3",
            name: "Serenity Poolside Villa",
            location: "Austin, Texas",
            type: "villa",
            price: 675000,
            beds: 5,
            baths: 4,
            area: 3100,
            images: 15,
            badge: "Popular",
            badgeClass: "badge-luxury",
            image: "assets/properties/sernity poolside villa.webp",
            featured: true
        },
        {
            id: "4",
            name: "Coastal Breeze Retreat",
            location: "Miami, Florida",
            type: "house",
            price: 795000,
            beds: 4,
            baths: 3,
            area: 2800,
            images: 14,
            badge: "Premium",
            badgeClass: "badge-luxury",
            image: "assets/properties/coastal breeze retreat.webp",
            featured: true
        },
        {
            id: "5",
            name: "Minimalist City Condo",
            location: "Seattle, Washington",
            type: "condo",
            price: 275000,
            beds: 2,
            baths: 1,
            area: 1100,
            images: 8,
            badge: "New Listing",
            badgeClass: "badge-new",
            image: "assets/properties/minimalist city condos.webp",
            featured: false
        },
        {
            id: "6",
            name: "The Willow Family Home",
            location: "Portland, Oregon",
            type: "house",
            price: 415000,
            beds: 3,
            baths: 2,
            area: 1950,
            images: 10,
            badge: "Featured",
            badgeClass: "",
            image: "assets/properties/willow family home.webp",
            featured: true
        },
        {
            id: "7",
            name: "Skyline View Apartment",
            location: "Chicago, Illinois",
            type: "apartment",
            price: 365000,
            beds: 3,
            baths: 2,
            area: 1450,
            images: 11,
            badge: "Popular",
            badgeClass: "",
            image: "assets/properties/skyline view appartment.webp",
            featured: false
        },
        {
            id: "8",
            name: "Emerald Garden Villa",
            location: "Orlando, Florida",
            type: "villa",
            price: 725000,
            beds: 5,
            baths: 4,
            area: 3300,
            images: 16,
            badge: "Premium",
            badgeClass: "badge-luxury",
            image: "assets/properties/emereld garden villa.webp",
            featured: false
        },
        {
            id: "9",
            name: "Parkside Modern Condo",
            location: "Denver, Colorado",
            type: "condo",
            price: 235000,
            beds: 2,
            baths: 2,
            area: 1050,
            images: 7,
            badge: "Great Value",
            badgeClass: "badge-new",
            image: "assets/properties/parkside mordern combos.webp",
            featured: false
        },
        {
            id: "10",
            name: "Golden Hour Residence",
            location: "San Diego, California",
            type: "house",
            price: 560000,
            beds: 4,
            baths: 3,
            area: 2250,
            images: 13,
            badge: "Featured",
            badgeClass: "",
            image: "assets/properties/golden house residency.webp",
            featured: true
        },
        {
            id: "11",
            name: "Riverside City Apartment",
            location: "Austin, Texas",
            type: "apartment",
            price: 195000,
            beds: 1,
            baths: 1,
            area: 780,
            images: 6,
            badge: "Great Value",
            badgeClass: "badge-new",
            image: "assets/properties/rever city appartment.webp",
            featured: false
        },
        {
            id: "12",
            name: "Blue Horizon Luxury Villa",
            location: "Malibu, California",
            type: "villa",
            price: 950000,
            beds: 6,
            baths: 5,
            area: 4100,
            images: 18,
            badge: "Luxury",
            badgeClass: "badge-luxury",
            image: "assets/properties/blue horrizon luxuary villa.webp",
            featured: true
        }
    ];

    /* =====================================
       PRELOADER
       Matches the homepage index.js logic.
       Do not load index.js on this page just
       to control the preloader.
    ===================================== */

    let preloaderHidden = false;

    function hidePreloader() {
        if (!preloader || preloaderHidden) return;

        preloaderHidden = true;

        preloader.classList.add("hidden");
        preloader.classList.add("is-hidden");
        preloader.setAttribute("aria-hidden", "true");

        document.body.classList.remove("is-loading");
    }

    document.body.classList.add("is-loading");

    if (preloader) {
        if (document.readyState === "complete") {
            window.setTimeout(hidePreloader, 220);
        } else {
            window.addEventListener(
                "load",
                () => window.setTimeout(hidePreloader, 220),
                { once: true }
            );
        }

        // Safety fallback: prevents the preloader getting stuck.
        window.setTimeout(hidePreloader, 1800);

        // Match the homepage fast-navigation flag.
        try {
            if (sessionStorage.getItem("stacklySkipLoader") === "1") {
                sessionStorage.removeItem("stacklySkipLoader");
                hidePreloader();
            }
        } catch (error) {
            console.warn("Could not read navigation loader setting.", error);
        }
    } else {
        document.body.classList.remove("is-loading");
    }

    /* =====================================
       FAST INTERNAL PAGE NAVIGATION
       Reuses the same sessionStorage flag
       used by the homepage index.js.
    ===================================== */

    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const link = target.closest('a[href$=".html"], a[href*=".html?"]');

        if (!link || event.defaultPrevented || event.button !== 0) return;

        if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        if (link.target && link.target !== "_self") return;

        let destination;

        try {
            destination = new URL(link.href, window.location.href);
        } catch {
            return;
        }

        if (
            destination.origin === window.location.origin &&
            destination.pathname !== window.location.pathname
        ) {
            try {
                sessionStorage.setItem("stacklySkipLoader", "1");
            } catch (error) {
                console.warn("Could not save navigation loader setting.", error);
            }
        }
    });

    /* =====================================
   SAFE LOCAL STORAGE — FAVOURITES
===================================== */

function readFavorites() {
    try {
        const parsed = JSON.parse(
            localStorage.getItem("homenest-favourites") || "[]"
        );

        return Array.isArray(parsed)
            ? parsed.filter((id) => typeof id === "string")
            : [];
    } catch {
        return [];
    }
}

let favorites = readFavorites();

function writeFavorites(updatedFavorites) {
    try {
        localStorage.setItem(
            "homenest-favourites",
            JSON.stringify(updatedFavorites)
        );

        favorites = updatedFavorites;
        updateFavoritesButton();

        window.dispatchEvent(
            new CustomEvent("homenest:favorites-updated")
        );
    } catch {
        showToast("Your browser could not save favourites.", "error");
    }
}



    function writeFavorites(updatedFavorites) {
    try {
        // Preserve the existing LocalStorage key
        localStorage.setItem(
            "homenest-favourites",
            JSON.stringify(updatedFavorites)
        );

        // Update the navigation count immediately
        favorites = updatedFavorites;
        updateFavoritesButton();

        // Notify other favourite-related scripts
        window.dispatchEvent(
            new CustomEvent("homenest:favorites-updated")
        );
    } catch {
        showToast("Your browser could not save favourites.", "error");
    }
}

    /* =====================================
       TOAST NOTIFICATIONS
    ===================================== */

    function showToast(message, type = "success") {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast${type === "error" ? " is-error" : ""}`;

        const icon = document.createElement("i");
        icon.className = type === "error"
            ? "fa-solid fa-circle-exclamation"
            : "fa-solid fa-circle-check";

        const text = document.createElement("span");
        text.textContent = message;

        toast.append(icon, text);
        toastContainer.appendChild(toast);

        window.setTimeout(() => {
            toast.classList.add("is-leaving");

            window.setTimeout(() => {
                toast.remove();
            }, 250);
        }, 2800);
    }

    /* =====================================
       MOBILE MENU
    ===================================== */

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("is-active");
        navMenu.classList.remove("is-open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.classList.toggle("is-active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) closeMenu();
        });
    }

    /* =====================================
       HEADER SCROLL + BACK TO TOP
    ===================================== */

    function updateScrollUI() {
        const position = window.scrollY;

        if (siteHeader) {
            siteHeader.classList.toggle("scrolled", position > 20);
        }

        if (backToTop) {
            backToTop.classList.toggle("is-visible", position > 450);
        }
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }

    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    /* =====================================
       FORMAT HELPERS
    ===================================== */

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });

    function formatPrice(price) {
        return currencyFormatter.format(price);
    }

    function formatNumber(number) {
        return new Intl.NumberFormat("en-US").format(number);
    }

    function getTypeLabel(type) {
        const labels = {
            house: "House",
            apartment: "Apartment",
            villa: "Villa",
            condo: "Condominium"
        };

        return labels[type] || type;
    }

    /* =====================================
       CREATE PROPERTY CARD
    ===================================== */

    function createPropertyCard(property, index) {
        const isFavorite = favorites.includes(property.id);

        const card = document.createElement("article");
        card.className = "property-card";
        card.dataset.propertyId = property.id;
        card.dataset.type = property.type;
        card.style.animationDelay = `${Math.min(index * 45, 270)}ms`;

        const imageWrap = document.createElement("div");
        imageWrap.className = "property-image-wrap";

        const image = document.createElement("img");
        image.className = "property-image";
        image.src = property.image;
        image.alt = `${property.name} in ${property.location}`;
        image.loading = "lazy";
        image.decoding = "async";

        image.addEventListener("error", () => {
            image.style.backgroundColor = "#E2EAF1";
            image.alt = `${property.name} image unavailable`;
        }, { once: true });

        const badge = document.createElement("span");
        badge.className = `property-badge ${property.badgeClass}`;
        badge.textContent = property.badge;

        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.className =
            `favorite-button${isFavorite ? " is-favorite" : ""}`;

        favoriteButton.dataset.favoriteId = property.id;
        favoriteButton.setAttribute("aria-pressed", String(isFavorite));
        favoriteButton.setAttribute(
            "aria-label",
            `${isFavorite ? "Remove" : "Add"} ${property.name} ${
                isFavorite ? "from" : "to"
            } favourites`
        );

        const heart = document.createElement("i");
        heart.className = isFavorite
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart";

        favoriteButton.appendChild(heart);

        const imageCount = document.createElement("span");
        imageCount.className = "image-count";

        const imageIcon = document.createElement("i");
        imageIcon.className = "fa-regular fa-image";

        imageCount.append(
            imageIcon,
            document.createTextNode(` ${property.images} photos`)
        );

        imageWrap.append(image, badge, favoriteButton, imageCount);

        const info = document.createElement("div");
        info.className = "property-info";

        const priceRow = document.createElement("div");
        priceRow.className = "property-price";

        const price = document.createElement("strong");
        price.textContent = formatPrice(property.price);

        const priceSuffix = document.createElement("span");
        priceSuffix.textContent = "/ sale";

        priceRow.append(price, priceSuffix);

        const title = document.createElement("h3");
        const titleLink = document.createElement("a");

        titleLink.href =
            `property-details.html?id=${encodeURIComponent(property.id)}`;

        titleLink.textContent = property.name;
        title.appendChild(titleLink);

        const location = document.createElement("p");
        location.className = "property-location";

        const locationIcon = document.createElement("i");
        locationIcon.className = "fa-solid fa-location-dot";

        location.append(
            locationIcon,
            document.createTextNode(` ${property.location}`)
        );

        const features = document.createElement("div");
        features.className = "property-features";

        const featureDefinitions = [
            {
                icon: "fa-solid fa-bed",
                text: `${property.beds} Beds`
            },
            {
                icon: "fa-solid fa-bath",
                text: `${property.baths} Baths`
            },
            {
                icon: "fa-solid fa-maximize",
                text: `${formatNumber(property.area)} sqft`
            }
        ];

        featureDefinitions.forEach((feature) => {
            const item = document.createElement("span");
            const icon = document.createElement("i");

            icon.className = feature.icon;

            item.append(
                icon,
                document.createTextNode(` ${feature.text}`)
            );

            features.appendChild(item);
        });

        const cardBottom = document.createElement("div");
        cardBottom.className = "property-card-bottom";

        const status = document.createElement("span");
        status.className = "property-status";
        status.textContent = "Available";

        const viewLink = document.createElement("a");
        viewLink.className = "property-link";
        viewLink.href = titleLink.href;
        viewLink.appendChild(document.createTextNode("View details "));

        const arrow = document.createElement("i");
        arrow.className = "fa-solid fa-arrow-right";

        viewLink.appendChild(arrow);
        cardBottom.append(status, viewLink);

        info.append(priceRow, title, location, features, cardBottom);
        card.append(imageWrap, info);

        return card;
    }

    /* =====================================
       FILTER PROPERTIES
    ===================================== */

    function getFilteredProperties() {
        let result = [...properties];

        const locationQuery = filters.location.toLowerCase();

        if (locationQuery) {
            result = result.filter((property) => {
                const searchableText =
                    `${property.name} ${property.location} ${property.type}`
                    .toLowerCase();

                return searchableText.includes(locationQuery);
            });
        }

        if (filters.type) {
            result = result.filter(
                (property) => property.type === filters.type
            );
        }

        if (filters.maxPrice !== null) {
            result = result.filter(
                (property) => property.price <= filters.maxPrice
            );
        }

        if (showOnlyFavorites) {
            result = result.filter(
                (property) => favorites.includes(property.id)
            );
        }

        switch (sortFilter?.value || "featured") {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "featured":
            default:
                result.sort((a, b) => {
                    if (a.featured !== b.featured) {
                        return Number(b.featured) - Number(a.featured);
                    }

                    return Number(a.id) - Number(b.id);
                });
                break;
        }

        return result;
    }

    /* =====================================
       ACTIVE FILTER TAGS
    ===================================== */

    function renderActiveFilters() {
        if (!activeFilters) return;

        activeFilters.replaceChildren();

        const tags = [];

        if (filters.location) {
            tags.push({
                key: "location",
                label: `Location: ${filters.location}`
            });
        }

        if (filters.type) {
            tags.push({
                key: "type",
                label: `Type: ${getTypeLabel(filters.type)}`
            });
        }

        if (filters.maxPrice !== null) {
            tags.push({
                key: "price",
                label: `Up to ${formatPrice(filters.maxPrice)}`
            });
        }

        if (showOnlyFavorites) {
            tags.push({
                key: "favorites",
                label: "Favourites only"
            });
        }

        tags.forEach((tag) => {
            const element = document.createElement("span");
            element.className = "active-filter-tag";

            const label = document.createElement("span");
            label.textContent = tag.label;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.setAttribute(
                "aria-label",
                `Remove ${tag.label} filter`
            );

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-xmark";

            removeButton.appendChild(icon);

            removeButton.addEventListener("click", () => {
                switch (tag.key) {
                    case "location":
                        filters.location = "";
                        if (locationInput) locationInput.value = "";
                        break;

                    case "type":
                        filters.type = "";
                        if (typeFilter) typeFilter.value = "";
                        updateQuickFilter();
                        break;

                    case "price":
                        filters.maxPrice = null;
                        if (priceFilter) priceFilter.value = "";
                        break;

                    case "favorites":
                        showOnlyFavorites = false;
                        updateFavoritesButton();
                        break;
                }

                currentPage = 1;
                renderProperties();
            });

            element.append(label, removeButton);
            activeFilters.appendChild(element);
        });
    }

    /* =====================================
       QUICK FILTER STATE
    ===================================== */

    function updateQuickFilter() {
        document.querySelectorAll("[data-quick-type]").forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.quickType === filters.type &&
                !showOnlyFavorites
            );
        });
    }

    function updateFavoritesButton() {
    // Keep the existing favourites filter state
    if (favoritesFilter) {
        favoritesFilter.classList.toggle(
            "active",
            showOnlyFavorites
        );

        favoritesFilter.setAttribute(
            "aria-pressed",
            String(showOnlyFavorites)
        );
    }

    // Update only the actual navigation count
    document.querySelectorAll(
        ".favorite-nav-link [data-favorite-count]"
    ).forEach((countElement) => {
        countElement.textContent = String(favorites.length);
    });

    // Also support the existing count element
    if (
        favoriteCount &&
        !favoriteCount.closest(".favorite-nav-link")
    ) {
        favoriteCount.textContent = String(favorites.length);
    }
}

    /* =====================================
       PAGINATION
    ===================================== */

    function renderPagination(totalItems) {
        if (!pagination) return;

        pagination.replaceChildren();

        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        if (totalPages <= 1) return;

        const createPageButton = (label, page, options = {}) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className =
                `page-button${options.active ? " active" : ""}`;

            button.textContent = label;
            button.disabled = Boolean(options.disabled);

            if (options.active) {
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", () => {
                if (button.disabled) return;

                currentPage = page;
                renderProperties();

                document.querySelector(".listing-toolbar")?.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            });

            return button;
        };

        pagination.appendChild(
            createPageButton("‹", Math.max(1, currentPage - 1), {
                disabled: currentPage === 1
            })
        );

        for (let page = 1; page <= totalPages; page += 1) {
            pagination.appendChild(
                createPageButton(String(page), page, {
                    active: page === currentPage
                })
            );
        }

        pagination.appendChild(
            createPageButton("›", Math.min(totalPages, currentPage + 1), {
                disabled: currentPage === totalPages
            })
        );
    }

    /* =====================================
       RENDER PROPERTIES
    ===================================== */

    function renderProperties() {
        if (!propertyGrid) return;

        const filteredProperties = getFilteredProperties();
        const totalItems = filteredProperties.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        if (currentPage < 1) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

        const pageItems = filteredProperties.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        propertyGrid.replaceChildren();
        propertyGrid.classList.toggle("list-view", currentView === "list");

        pageItems.forEach((property, index) => {
            propertyGrid.appendChild(createPropertyCard(property, index));
        });

        if (emptyState) {
            emptyState.hidden = totalItems !== 0;
        }

        propertyGrid.hidden = totalItems === 0;

        if (resultsCount) {
            if (totalItems === 0) {
                resultsCount.textContent = "No matching properties found.";
            } else {
                const firstItem = startIndex + 1;
                const lastItem = Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    totalItems
                );

                resultsCount.replaceChildren();

                const strong = document.createElement("strong");
                strong.textContent =
                    `${firstItem}–${lastItem} of ${totalItems} properties`;

                resultsCount.appendChild(strong);
            }
        }

        renderPagination(totalItems);
        renderActiveFilters();
        updateQuickFilter();
        updateFavoritesButton();
    }

    /* =====================================
       READ URL FILTERS
    ===================================== */

    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);

        const location = params.get("location") || "";
        const type = params.get("type") || "";
        const price = params.get("price") || "";

        filters.location = location.trim();

        const validTypes = ["house", "apartment", "villa", "condo"];

        filters.type = validTypes.includes(type.toLowerCase())
            ? type.toLowerCase()
            : "";

        // Accept exact maximum price or a "min-max" range.
        if (/^\d+$/.test(price)) {
            filters.maxPrice = Number(price);
        } else if (/^\d+-\d+$/.test(price)) {
            const [, max] = price.split("-").map(Number);
            filters.maxPrice = max;
        } else {
            filters.maxPrice = null;
        }

        if (locationInput) {
            locationInput.value = filters.location;
        }

        if (typeFilter) {
            typeFilter.value = filters.type;
        }

        if (priceFilter) {
            if (filters.maxPrice !== null) {
                const supportedPrices = [
                    100000,
                    250000,
                    500000,
                    750000,
                    1000000
                ];

                priceFilter.value = supportedPrices.includes(filters.maxPrice)
                    ? String(filters.maxPrice)
                    : "";
            } else {
                priceFilter.value = "";
            }
        }
    }

    /* =====================================
       SEARCH SUBMIT
    ===================================== */

    if (listingSearch) {
        listingSearch.addEventListener("submit", (event) => {
            event.preventDefault();

            filters.location = locationInput
                ? locationInput.value.trim()
                : "";

            filters.type = typeFilter ? typeFilter.value : "";

            const maxPriceValue = priceFilter ? priceFilter.value : "";

            filters.maxPrice = maxPriceValue
                ? Number(maxPriceValue)
                : null;

            showOnlyFavorites = false;
            currentPage = 1;

            updateFavoritesButton();
            renderProperties();
        });
    }

    /* =====================================
       INSTANT FILTER CHANGES
    ===================================== */

    if (typeFilter) {
        typeFilter.addEventListener("change", () => {
            filters.type = typeFilter.value;
            showOnlyFavorites = false;
            currentPage = 1;

            renderProperties();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener("change", () => {
            filters.maxPrice = priceFilter.value
                ? Number(priceFilter.value)
                : null;

            currentPage = 1;
            renderProperties();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", () => {
            currentPage = 1;
            renderProperties();
        });
    }

    /* =====================================
       QUICK FILTERS
    ===================================== */

    document.querySelectorAll("[data-quick-type]").forEach((button) => {
        button.addEventListener("click", () => {
            filters.type = button.dataset.quickType || "";

            if (typeFilter) {
                typeFilter.value = filters.type;
            }

            showOnlyFavorites = false;
            currentPage = 1;

            renderProperties();
        });
    });

    if (favoritesFilter) {
        favoritesFilter.addEventListener("click", () => {
            showOnlyFavorites = !showOnlyFavorites;
            currentPage = 1;

            renderProperties();

            if (showOnlyFavorites && favorites.length === 0) {
                showToast(
                    "You haven't saved any favourite properties yet."
                );
            }
        });
    }

    /* =====================================
       FAVOURITE BUTTONS
    ===================================== */

    if (propertyGrid) {
        propertyGrid.addEventListener("click", (event) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const button = target.closest("[data-favorite-id]");

            if (!button) return;

            const propertyId = button.dataset.favoriteId;

            const property = properties.find(
                (item) => item.id === propertyId
            );

            if (!property) return;

            const index = favorites.indexOf(propertyId);
            const isAdding = index === -1;

            if (isAdding) {
                favorites.push(propertyId);
            } else {
                favorites.splice(index, 1);
            }

            writeFavorites(favorites);

            showToast(
                isAdding
                    ? `${property.name} added to favourites.`
                    : `${property.name} removed from favourites.`
            );

            renderProperties();
        });
    }

    /* =====================================
       GRID / LIST VIEW
    ===================================== */

    function setView(view) {
        currentView = view;

        const isGrid = view === "grid";

        if (gridViewButton) {
            gridViewButton.classList.toggle("active", isGrid);
            gridViewButton.setAttribute("aria-pressed", String(isGrid));
        }

        if (listViewButton) {
            listViewButton.classList.toggle("active", !isGrid);
            listViewButton.setAttribute("aria-pressed", String(!isGrid));
        }

        if (propertyGrid) {
            propertyGrid.classList.toggle("list-view", !isGrid);
        }
    }

    if (gridViewButton) {
        gridViewButton.addEventListener("click", () => setView("grid"));
    }

    if (listViewButton) {
        listViewButton.addEventListener("click", () => setView("list"));
    }

    /* =====================================
       CLEAR / RESET FILTERS
    ===================================== */

    function clearFilters() {
        filters = {
            location: "",
            type: "",
            maxPrice: null
        };

        showOnlyFavorites = false;
        currentPage = 1;

        if (locationInput) locationInput.value = "";
        if (typeFilter) typeFilter.value = "";
        if (priceFilter) priceFilter.value = "";
        if (sortFilter) sortFilter.value = "featured";

        updateFavoritesButton();
        renderProperties();
    }

    if (clearFiltersButton) {
        clearFiltersButton.addEventListener("click", clearFilters);
    }

    if (resetSearchButton) {
        resetSearchButton.addEventListener("click", clearFilters);
    }

    /* =====================================
       CURRENT YEAR
    ===================================== */

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    /* =====================================
       INITIALIZE PAGE
    ===================================== */

    loadFiltersFromURL();
    updateFavoritesButton();
    renderProperties();

    console.info("HomeNest properties page initialized.");
});

/* =====================================
   GLOBAL FAVOURITES NAV COUNT SYNC
===================================== */

function syncFavoritesNavigationCount() {
    let savedFavorites = [];

    try {
        const stored = JSON.parse(
            localStorage.getItem("homenest-favourites") || "[]"
        );

        if (Array.isArray(stored)) {
            savedFavorites = [...new Set(stored.map(String))];
        }
    } catch (error) {
        console.warn("Unable to read saved favourites.", error);
    }

    document.querySelectorAll(
        ".favorite-nav-link [data-favorite-count]"
    ).forEach((element) => {
        element.textContent = String(savedFavorites.length);
    });
}

// Update as soon as the page loads
syncFavoritesNavigationCount();

// Update when another tab changes favourites
window.addEventListener("storage", (event) => {
    if (
        event.key === "homenest-favourites" ||
        event.key === null
    ) {
        syncFavoritesNavigationCount();
    }
});

// Update when another page's favourite script sends an event
window.addEventListener(
    "homenest:favorites-updated",
    syncFavoritesNavigationCount
);

// Refresh the count when returning to this page
window.addEventListener(
    "pageshow",
    syncFavoritesNavigationCount
);