/* =========================================================
   HOMENEST BOOKING PAGE
   - Property selection through URL ID
   - Existing preloader and mobile navigation
   - Viewing form validation
   - Rental payment and deposit estimate
   - Payment review step
   - LocalStorage booking persistence
   - Confirmation modal
   - Footer and back-to-top
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const BOOKING_STORAGE_KEY = "homenest-bookings";
    const RENTAL_STORAGE_KEY = "homenest-rental-bookings";

    const SERVICE_FEE = 5000;
    const DEFAULT_DEPOSIT_MONTHS = 10;

    const properties = [
        {
            id: 1,
            title: "3BHK Villa",
            location: "Whitefield, Bangalore",
            type: "Villa",
            bedrooms: 3,
            bathrooms: 3,
            area: 2400,
            monthlyRent: 25000,
            image: "assets/properties/modern hill side resorts.webp"
        },
        {
            id: 2,
            title: "Contemporary Family Home",
            location: "Austin",
            type: "House",
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            monthlyRent: 32000,
            image: "assets/properties/urban living apartment.webp"
        },
        {
            id: 3,
            title: "Premium City Apartment",
            location: "Downtown Miami",
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1450,
            monthlyRent: 18000,
            image: "assets/properties/sernity poolside villa.webp"
        },
        {
            id: 4,
            title: "Elegant Suburban Residence",
            location: "Plano, Dallas",
            type: "House",
            bedrooms: 4,
            bathrooms: 3,
            area: 2600,
            monthlyRent: 30000,
            image: "assets/properties/coastal breeze retreat.webp"
        },
        {
            id: 5,
            title: "Waterfront Luxury Estate",
            location: "Tampa Bay",
            type: "Estate",
            bedrooms: 5,
            bathrooms: 4,
            area: 3800,
            monthlyRent: 45000,
            image: "assets/properties/minimalist city condos.webp"
        },
        {
            id: 6,
            title: "Minimalist Modern Apartment",
            location: "Seattle",
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1250,
            monthlyRent: 16000,
            image: "assets/properties/willow family home.webp"
        },
        {
            id: 7,
            title: "Charming Garden Townhouse",
            location: "Portland",
            type: "Townhouse",
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            monthlyRent: 22000,
            image: "assets/properties/skyline view appartment.webp"
        },
        {
            id: 8,
            title: "Spacious Family Villa",
            location: "Orlando",
            type: "Villa",
            bedrooms: 4,
            bathrooms: 4,
            area: 3100,
            monthlyRent: 38000,
            image: "assets/properties/emereld garden villa.webp"
        },
        {
            id: 9,
            title: "Urban Loft Residence",
            location: "Brooklyn",
            type: "Loft",
            bedrooms: 2,
            bathrooms: 2,
            area: 1550,
            monthlyRent: 24000,
            image: "assets/properties/parkside mordern combos.webp"
        },
        {
            id: 10,
            title: "Peaceful Country Home",
            location: "Nashville",
            type: "House",
            bedrooms: 3,
            bathrooms: 2,
            area: 2200,
            monthlyRent: 27000,
            image: "assets/properties/golden house residency.webp"
        },
        {
            id: 11,
            title: "Executive Penthouse",
            location: "Chicago",
            type: "Penthouse",
            bedrooms: 4,
            bathrooms: 3,
            area: 2900,
            monthlyRent: 40000,
            image: "assets/properties/rever city appartment.webp"
        },
        {
            id: 12,
            title: "Modern Starter Home",
            location: "Phoenix",
            type: "House",
            bedrooms: 3,
            bathrooms: 2,
            area: 1900,
            monthlyRent: 20000,
            image: "assets/properties/blue horrizon luxuary villa.webp"
        }
    ];

    const getElement = (id) => document.getElementById(id);

    const params = new URLSearchParams(window.location.search);
    const requestedId = Number(params.get("id"));

    let selectedProperty =
        properties.find((property) => property.id === requestedId) ||
        properties[0];

    let toastTimer = null;
    let lastFocusedElement = null;

    /* =====================================================
       HELPERS
    ===================================================== */

    function formatINR(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(Number(value) || 0);
    }

    function setText(id, value) {
        const element = getElement(id);

        if (element) {
            element.textContent = value ?? "";
        }
    }

    function setImage(id, source, altText) {
        const image = getElement(id);

        if (!image) return;

        image.src = source;
        image.alt = altText || "Selected property";

        image.onerror = () => {
            image.onerror = null;
            image.src =
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80";
        };
    }

    function getLocalDateString(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function formatDate(dateString) {
        if (!dateString) return "—";

        const date = new Date(`${dateString}T00:00:00`);

        if (Number.isNaN(date.getTime())) return dateString;

        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    }

    function formatTime(timeString) {
        if (!timeString) return "—";

        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();

        date.setHours(hours, minutes, 0, 0);

        return new Intl.DateTimeFormat("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(date);
    }

    function getRentalAmounts(property) {
        const monthlyRent = Number(property.monthlyRent) || 0;
        const deposit = monthlyRent * DEFAULT_DEPOSIT_MONTHS;
        const serviceFee = SERVICE_FEE;

        return {
            monthlyRent,
            deposit,
            serviceFee,
            total: monthlyRent + deposit + serviceFee
        };
    }

    function showToast(message) {
        const toast = getElement("toastMessage");
        const toastText = getElement("toastText");

        if (!toast || !toastText) return;

        toastText.textContent = message;
        toast.classList.add("show");

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }

    function safeReadBookings(key) {
        try {
            const stored = localStorage.getItem(key);

            if (!stored) return [];

            const parsed = JSON.parse(stored);

            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error(`Unable to read ${key}:`, error);
            return [];
        }
    }

    function safeSaveBookings(key, booking) {
        try {
            const bookings = safeReadBookings(key);

            bookings.unshift(booking);

            localStorage.setItem(key, JSON.stringify(bookings));

            return true;
        } catch (error) {
            console.error(`Unable to save ${key}:`, error);

            showToast(
                "Could not save your request. Please check browser storage settings."
            );

            return false;
        }
    }

    function createReference() {
        const randomPart = Math.random()
            .toString(36)
            .slice(2, 8)
            .toUpperCase();

        return `HN-${Date.now().toString().slice(-6)}-${randomPart}`;
    }

    /* =====================================================
       PROPERTY SUMMARY AND RENTAL COSTS
    ===================================================== */

    function updatePropertySummary() {
        const property = selectedProperty;
        const amounts = getRentalAmounts(property);

        setText("summaryType", property.type);
        setText("summaryTitle", property.title);
        setText("summaryLocation", property.location);
        setText("summaryPrice", formatINR(amounts.monthlyRent));
        setText("summaryBedrooms", property.bedrooms);
        setText("summaryBathrooms", property.bathrooms);
        setText("summaryArea", Number(property.area).toLocaleString("en-IN"));

        setImage("summaryImage", property.image, property.title);

        setText("paymentPropertyType", property.type);
        setText("paymentPropertyName", property.title);
        setText("paymentPropertyLocation", property.location);

        setImage("paymentPropertyImage", property.image, property.title);

        setText("monthlyRentAmount", formatINR(amounts.monthlyRent));
        setText("depositAmount", formatINR(amounts.deposit));
        setText("serviceFeeAmount", formatINR(amounts.serviceFee));
        setText("totalPayable", formatINR(amounts.total));

        setText("sidebarMonthlyRent", formatINR(amounts.monthlyRent));
        setText("sidebarDeposit", formatINR(amounts.deposit));
        setText("sidebarServiceFee", formatINR(amounts.serviceFee));
        setText("sidebarTotal", formatINR(amounts.total));

        setText(
            "depositMonthsLabel",
            `(${DEFAULT_DEPOSIT_MONTHS} months)`
        );

        const propertyLink = getElement("viewPropertyLink");

        if (propertyLink) {
            propertyLink.href = `property-details.html?id=${property.id}`;
        }
    }

    /* =====================================================
       PRELOADER
    ===================================================== */

    function hidePreloader() {
        const loader = getElement("pageLoader");

        if (!loader) {
            document.body.classList.remove("is-loading");
            return;
        }

        loader.classList.add("hidden");
        document.body.classList.remove("is-loading");

        window.setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }

    function initialisePreloader() {
        const skipLoader = sessionStorage.getItem("stacklySkipLoader");

        if (skipLoader === "true") {
            sessionStorage.removeItem("stacklySkipLoader");
            hidePreloader();
            return;
        }

        window.setTimeout(hidePreloader, 850);
    }

    /* =====================================================
       HEADER / MOBILE NAVIGATION
    ===================================================== */

    function initialiseNavigation() {
        const menuToggle = getElement("menuToggle");
        const navMenu = getElement("navMenu");
        const header = getElement("siteHeader");

        function closeMenu() {
            if (!menuToggle || !navMenu) return;

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            navMenu.classList.remove("open", "active");
            document.body.classList.remove("nav-open");
        }

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", () => {
                const isExpanded =
                    menuToggle.getAttribute("aria-expanded") === "true";

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!isExpanded)
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isExpanded
                        ? "Open navigation menu"
                        : "Close navigation menu"
                );

                navMenu.classList.toggle("open", !isExpanded);
                navMenu.classList.toggle("active", !isExpanded);

                document.body.classList.toggle("nav-open", !isExpanded);
            });

            navMenu.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", closeMenu);
            });

            document.addEventListener("click", (event) => {
                if (
                    !navMenu.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMenu();
                }
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 900) {
                    closeMenu();
                }
            });
        }

        function updateHeader() {
            if (!header) return;

            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );
        }

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();

        document.querySelectorAll(".nav-menu .nav-link").forEach((link) => {
            const href = link.getAttribute("href");

            if (href === "properties.html") {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    const fieldErrorIds = {
        fullName: "fullNameError",
        email: "emailError",
        phone: "phoneError",
        viewers: "viewersError",
        viewingDate: "viewingDateError",
        viewingTime: "viewingTimeError",
        purpose: "purposeError",
        agreeTerms: "agreeTermsError"
    };

    function setFieldError(fieldId, message) {
        const field = getElement(fieldId);
        const error = getElement(fieldErrorIds[fieldId]);

        if (error) {
            error.textContent = message;
        }

        if (field) {
            const wrapper = field.closest(".form-field");

            if (wrapper) {
                wrapper.classList.toggle("has-error", Boolean(message));
            }

            field.setAttribute("aria-invalid", message ? "true" : "false");
        }
    }

    function clearFieldError(fieldId) {
        setFieldError(fieldId, "");
    }

    function validateForm() {
        let isValid = true;

        const fullName = getElement("fullName").value.trim();
        const email = getElement("email").value.trim();
        const phone = getElement("phone").value.trim();
        const viewers = getElement("viewers").value;
        const viewingDate = getElement("viewingDate").value;
        const viewingTime = getElement("viewingTime").value;
        const purpose = getElement("purpose").value;
        const agreeTerms = getElement("agreeTerms").checked;

        Object.keys(fieldErrorIds).forEach(clearFieldError);

        if (fullName.length < 2) {
            setFieldError(
                "fullName",
                "Please enter your full name."
            );
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setFieldError(
                "email",
                "Please enter a valid email address."
            );
            isValid = false;
        }

        const phoneDigits = phone.replace(/\D/g, "");

        if (
            phoneDigits.length < 7 ||
            phoneDigits.length > 15 ||
            !/^[+\d\s().-]+$/.test(phone)
        ) {
            setFieldError(
                "phone",
                "Please enter a valid phone number."
            );
            isValid = false;
        }

        if (!viewers) {
            setFieldError(
                "viewers",
                "Please select the number of visitors."
            );
            isValid = false;
        }

        if (!viewingDate) {
            setFieldError(
                "viewingDate",
                "Please select your preferred date."
            );
            isValid = false;
        } else if (
            viewingDate < getLocalDateString(new Date())
        ) {
            setFieldError(
                "viewingDate",
                "The viewing date cannot be in the past."
            );
            isValid = false;
        }

        if (!viewingTime) {
            setFieldError(
                "viewingTime",
                "Please select a viewing time."
            );
            isValid = false;
        }

        if (!purpose) {
            setFieldError(
                "purpose",
                "Please select the purpose of your visit."
            );
            isValid = false;
        }

        if (!agreeTerms) {
            setFieldError(
                "agreeTerms",
                "Please confirm the information before continuing."
            );
            isValid = false;
        }

        if (!isValid) {
            const firstInvalid = document.querySelector(
                '.form-field.has-error input, ' +
                '.form-field.has-error select, ' +
                '.form-field.has-error textarea, ' +
                '#agreeTerms[aria-invalid="true"]'
            );

            if (firstInvalid) {
                firstInvalid.focus();
            }
        }

        return isValid;
    }

    function initialiseValidation() {
        Object.keys(fieldErrorIds).forEach((fieldId) => {
            const field = getElement(fieldId);

            if (!field) return;

            const eventName =
                field.type === "checkbox" || field.tagName === "SELECT"
                    ? "change"
                    : "input";

            field.addEventListener(eventName, () => {
                clearFieldError(fieldId);
            });
        });

        const messageField = getElement("message");
        const messageCount = getElement("messageCount");

        if (messageField && messageCount) {
            const updateCount = () => {
                messageCount.textContent =
                    String(messageField.value.length);
            };

            messageField.addEventListener("input", updateCount);
            updateCount();
        }
    }

    /* =====================================================
       PROGRESS AND PAYMENT REVIEW
    ===================================================== */

    function setProgress(activeStep) {
        document.querySelectorAll("[data-progress-step]").forEach((step) => {
            const number = Number(
                step.getAttribute("data-progress-step")
            );

            step.classList.toggle("active", number === activeStep);
            step.classList.toggle("completed", number < activeStep);
        });
    }

    function scrollToElement(element) {
        if (!element) return;

        element.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth",
            block: "start"
        });
    }

    function openPaymentReview() {
        const fullName = getElement("fullName").value.trim();
        const viewingDate = getElement("viewingDate").value;
        const viewingTime = getElement("viewingTime").value;
        const viewers = getElement("viewers").value;

        setText("reviewFullName", fullName);
        setText("paymentViewingDate", formatDate(viewingDate));
        setText("paymentViewingTime", formatTime(viewingTime));

        setText(
            "paymentVisitors",
            `${viewers} ${Number(viewers) === 1 ? "visitor" : "visitors"}`
        );

        updatePropertySummary();

        getElement("bookingSection").hidden = true;
        getElement("paymentSection").hidden = false;

        setProgress(2);

        scrollToElement(getElement("paymentSection"));
    }

    function returnToForm() {
        getElement("paymentSection").hidden = true;
        getElement("bookingSection").hidden = false;

        setProgress(1);

        scrollToElement(getElement("bookingSection"));
    }

    /* =====================================================
       SAVE BOOKING
    ===================================================== */

    function createBookingRecord() {
        const amounts = getRentalAmounts(selectedProperty);

        return {
            id: createReference(),
            reference: null,

            propertyId: selectedProperty.id,
            property: selectedProperty.title,
            propertyName: selectedProperty.title,
            propertyType: selectedProperty.type,
            propertyLocation: selectedProperty.location,
            propertyImage: selectedProperty.image,

            fullName: getElement("fullName").value.trim(),
            email: getElement("email").value.trim(),
            phone: getElement("phone").value.trim(),
            viewers: Number(getElement("viewers").value),

            viewingDate: getElement("viewingDate").value,
            viewingTime: getElement("viewingTime").value,
            purpose: getElement("purpose").value,
            message: getElement("message").value.trim(),

            monthlyRent: amounts.monthlyRent,
            securityDeposit: amounts.deposit,
            deposit: amounts.deposit,
            depositMonths: DEFAULT_DEPOSIT_MONTHS,
            serviceFee: amounts.serviceFee,
            totalPayable: amounts.total,
            total: amounts.total,

            status: "Viewing Request Saved",
            paymentStatus: "Not Processed",

            createdAt: new Date().toISOString()
        };
    }

    function saveBooking() {
        const booking = createBookingRecord();

        booking.reference = booking.id;

        const firstSaved = safeSaveBookings(
            BOOKING_STORAGE_KEY,
            booking
        );

        if (!firstSaved) return;

        /*
         * Keep the old rental bookings key for compatibility
         * with the existing My Bookings page.
         */
        const secondSaved = safeSaveBookings(
            RENTAL_STORAGE_KEY,
            booking
        );

        if (!secondSaved) {
            showToast(
                "The request was saved, but the rental history copy failed."
            );
        }

        showConfirmation(booking);

        window.dispatchEvent(
            new CustomEvent("homenest:rental-booking-created", {
                detail: booking
            })
        );
    }

    /* =====================================================
       CONFIRMATION MODAL
    ===================================================== */

    function showConfirmation(booking) {
        const amounts = getRentalAmounts(selectedProperty);

        setText("bookingReference", booking.reference);
        setText("confirmationProperty", selectedProperty.title);
        setText("confirmationDate", formatDate(booking.viewingDate));
        setText("confirmationTime", formatTime(booking.viewingTime));
        setText("confirmationTotal", formatINR(amounts.total));

        const overlay = getElement("confirmationOverlay");

        lastFocusedElement = document.activeElement;

        overlay.hidden = false;
        document.body.classList.add("modal-open");

        setProgress(3);

        const doneButton = getElement("confirmationDone");

        if (doneButton) {
            doneButton.focus();
        }
    }

    function closeConfirmation() {
        const overlay = getElement("confirmationOverlay");

        if (!overlay || overlay.hidden) return;

        overlay.hidden = true;
        document.body.classList.remove("modal-open");

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }

        getElement("bookingSection").hidden = false;
        getElement("paymentSection").hidden = true;

        getElement("bookingForm").reset();

        setText("messageCount", "0");

        Object.keys(fieldErrorIds).forEach(clearFieldError);

        setProgress(1);

        scrollToElement(getElement("bookingSection"));
    }

    function initialiseConfirmation() {
        const overlay = getElement("confirmationOverlay");

        getElement("confirmationClose").addEventListener(
            "click",
            closeConfirmation
        );

        getElement("confirmationDone").addEventListener(
            "click",
            closeConfirmation
        );

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeConfirmation();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                !overlay.hidden
            ) {
                closeConfirmation();
            }
        });
    }

    /* =====================================================
       FOOTER
    ===================================================== */

    function initialiseFooter() {
        setText("currentYear", new Date().getFullYear());

        const backToTop = getElement("backToTop");

        if (backToTop) {
            const updateBackToTop = () => {
                backToTop.classList.toggle(
                    "visible",
                    window.scrollY > 400
                );
            };

            window.addEventListener(
                "scroll",
                updateBackToTop,
                { passive: true }
            );

            updateBackToTop();

            backToTop.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth"
                });
            });
        }
    }

    /* =====================================================
       EVENT LISTENERS
    ===================================================== */

    function initialiseForm() {
        const form = getElement("bookingForm");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!validateForm()) {
                showToast("Please correct the highlighted fields.");
                return;
            }

            openPaymentReview();
        });

        getElement("backToBooking").addEventListener(
            "click",
            returnToForm
        );

        getElement("confirmBooking").addEventListener("click", () => {
            saveBooking();
        });

        getElement("changePropertyLink").addEventListener(
            "click",
            () => {
                /*
                 * Keep normal navigation to the existing properties page.
                 */
                sessionStorage.setItem("stacklySkipLoader", "true");
            }
        );

        getElement("viewPropertyLink").addEventListener(
            "click",
            () => {
                sessionStorage.setItem("stacklySkipLoader", "true");
            }
        );
    }

    /* =====================================================
       INITIALISE PAGE
    ===================================================== */

    function initialiseDateInput() {
        const dateInput = getElement("viewingDate");

        if (!dateInput) return;

        dateInput.min = getLocalDateString(new Date());
    }

    initialisePreloader();
    initialiseNavigation();
    initialiseValidation();
    initialiseDateInput();
    initialiseFooter();
    initialiseConfirmation();
    initialiseForm();

    updatePropertySummary();
});

/* =========================================
GLOBAL FAVOURITES NAV COUNT
HomeNest / Stackly
========================================= */

(function () {
"use strict";


const FAVORITES_KEY = "homenest-favourites";

function updateFavoritesNavCount() {
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

    document.querySelectorAll(
        ".favorite-nav-link .favorite-count, " +
        ".favorite-nav-link [data-favorite-count]"
    ).forEach((element) => {
        element.textContent = String(favorites.length);
    });

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

/* Update when the page opens */
updateFavoritesNavCount();

/* Update when another browser tab changes favourites */
window.addEventListener("storage", (event) => {
    if (
        event.key === FAVORITES_KEY ||
        event.key === null
    ) {
        updateFavoritesNavCount();
    }
});

/* Update when another script changes favourites */
window.addEventListener(
    "homenest:favorites-updated",
    updateFavoritesNavCount
);

/* Update when returning to this page */
window.addEventListener(
    "pageshow",
    updateFavoritesNavCount
);


})();
