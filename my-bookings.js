/* =========================================================
   HOMENEST — MY BOOKINGS DASHBOARD
   Vanilla JavaScript
   Existing localStorage data preserved
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. SELECT ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuToggle =
        document.getElementById("menuToggle") ||
        document.getElementById("mobileMenuToggle");

    const mainNavigation =
        document.getElementById("navMenu") ||
        document.getElementById("mainNavigation");

    const bookingList =
        document.getElementById("bookingList");

    const emptyState =
        document.getElementById("emptyState");

    const emptyStateTitle =
        document.getElementById("emptyStateTitle");

    const emptyStateMessage =
        document.getElementById("emptyStateMessage");

    const bookingSearch =
        document.getElementById("bookingSearch");

    const totalBookings =
        document.getElementById("totalBookings");

    const upcomingBookings =
        document.getElementById("upcomingBookings");

    const completedBookings =
        document.getElementById("completedBookings");

    const allCount =
        document.getElementById("allCount");

    const upcomingCount =
        document.getElementById("upcomingCount");

    const completedCount =
        document.getElementById("completedCount");

    const cancelModal =
        document.getElementById("cancelModal");

    const keepBookingBtn =
        document.getElementById("keepBookingBtn");

    const confirmCancelBtn =
        document.getElementById("confirmCancelBtn");

    const toastContainer =
        document.getElementById("toastContainer");

    const currentYear =
        document.getElementById("currentYear");

    const dashboardSidebar =
        document.querySelector(".dashboard-sidebar");

    const dashboardSidebarToggle =
        document.getElementById("dashboardSidebarToggle");

    const dashboardOverlay =
        document.getElementById("dashboardOverlay");

    const sidebarBookingCount =
        document.getElementById("sidebarBookingCount");

    const bookingTabsContainer =
        document.querySelector(".booking-tabs");


    /* =====================================================
       2. LOCAL STORAGE KEYS
    ===================================================== */

    const BOOKING_STORAGE_KEY = "homenest-bookings";

    let bookings = loadBookings();

    let activeFilter = "all";
    let searchQuery = "";
    let bookingToCancel = null;


    /* =====================================================
       3. SAFE LOCAL STORAGE HELPERS
    ===================================================== */

    function loadBookings() {
        try {
            const storedBookings =
                localStorage.getItem(BOOKING_STORAGE_KEY);

            if (!storedBookings) {
                return [];
            }

            const parsedBookings = JSON.parse(storedBookings);

            if (Array.isArray(parsedBookings)) {
                return parsedBookings;
            }

            console.warn(
                "HomeNest: Stored bookings data is not an array."
            );

            return [];
        } catch (error) {
            console.error(
                "HomeNest: Unable to read bookings.",
                error
            );

            return [];
        }
    }


    function saveBookings() {
        try {
            localStorage.setItem(
                BOOKING_STORAGE_KEY,
                JSON.stringify(bookings)
            );

            return true;
        } catch (error) {
            console.error(
                "HomeNest: Unable to save bookings.",
                error
            );

            showToast(
                "Unable to save booking changes. Please try again.",
                "error"
            );

            return false;
        }
    }


    /* =====================================================
       4. SAFE HTML ESCAPING
    ===================================================== */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function safeImagePath(value) {
        const fallbackImage = "assets/images/property-1.jpg";

        if (typeof value !== "string" || !value.trim()) {
            return fallbackImage;
        }

        const imagePath = value.trim();

        if (
            imagePath.startsWith("javascript:") ||
            imagePath.startsWith("data:") ||
            imagePath.startsWith("vbscript:")
        ) {
            return fallbackImage;
        }

        return imagePath;
    }


    function safeLink(value) {
        if (typeof value !== "string" || !value.trim()) {
            return "properties.html";
        }

        const link = value.trim();

        if (
            link.startsWith("javascript:") ||
            link.startsWith("data:") ||
            link.startsWith("vbscript:")
        ) {
            return "properties.html";
        }

        return link;
    }


    /* =====================================================
       5. PROPERTY DATA HELPERS
    ===================================================== */

    function getPropertyName(booking) {
        return (
            booking.propertyName ||
            booking.property_name ||
            booking.name ||
            booking.title ||
            booking.propertyTitle ||
            booking.property_title ||
            "Beautiful HomeNest Property"
        );
    }


    function getPropertyLocation(booking) {
        if (booking.location) {
            if (typeof booking.location === "string") {
                return booking.location;
            }

            if (typeof booking.location === "object") {
                return [
                    booking.location.address,
                    booking.location.city,
                    booking.location.state
                ]
                    .filter(Boolean)
                    .join(", ");
            }
        }

        return (
            booking.address ||
            booking.propertyAddress ||
            booking.property_address ||
            booking.city ||
            "Location details available on request"
        );
    }


    function getPropertyImage(booking) {
        return safeImagePath(
            booking.image ||
            booking.propertyImage ||
            booking.property_image ||
            booking.imageUrl ||
            booking.image_url ||
            booking.thumbnail ||
            "assets/images/property-1.jpg"
        );
    }



function getPropertyPrice(booking) {
    return (
        booking.totalPayable ??
        booking.total ??
        booking.price ??
        booking.totalPrice ??
        booking.total_price ??
        booking.amount ??
        booking.monthlyRent ??
        booking.rent ??
        booking.propertyPrice ??
        booking.property_price ??
        0
    );
}




    function getBookingReference(booking, index) {
        return (
            booking.bookingId ||
            booking.booking_id ||
            booking.reference ||
            booking.bookingReference ||
            booking.booking_reference ||
            booking.id ||
            `HN-${String(index + 1).padStart(4, "0")}`
        );
    }


    function getBookingDate(booking) {
        return (
            booking.bookingDate ||
            booking.booking_date ||
            booking.date ||
            booking.visitDate ||
            booking.visit_date ||
            booking.checkIn ||
            booking.check_in ||
            booking.createdAt ||
            booking.created_at ||
            ""
        );
    }


    function getBookingTime(booking) {
        return (
            booking.bookingTime ||
            booking.booking_time ||
            booking.time ||
            booking.visitTime ||
            booking.visit_time ||
            "Time not specified"
        );
    }


    function getBookingType(booking) {
        return (
            booking.propertyType ||
            booking.property_type ||
            booking.type ||
            booking.category ||
            "Residential Property"
        );
    }


    function getBookingStatus(booking) {
        return String(
            booking.status ||
            booking.bookingStatus ||
            booking.booking_status ||
            "upcoming"
        )
            .trim()
            .toLowerCase();
    }


    /* =====================================================
       6. STATUS HELPERS
    ===================================================== */

    function isCancelled(booking) {
        const status = getBookingStatus(booking);

        return [
            "cancelled",
            "canceled",
            "rejected",
            "cancel"
        ].includes(status);
    }


    function isCompleted(booking) {
        const status = getBookingStatus(booking);

        if (isCancelled(booking)) {
            return false;
        }

        return [
            "completed",
            "visited",
            "closed",
            "finished"
        ].includes(status);
    }


    function isPending(booking) {
        const status = getBookingStatus(booking);

        return [
            "pending",
            "requested",
            "awaiting",
            "processing"
        ].includes(status);
    }


    function isUpcoming(booking) {
        if (
            isCancelled(booking) ||
            isCompleted(booking)
        ) {
            return false;
        }

        const status = getBookingStatus(booking);

        if (isPending(booking)) {
            return true;
        }

        const bookingDate = getBookingDate(booking);

        if (!bookingDate) {
            return true;
        }

        const parsedDate = new Date(bookingDate);

        if (Number.isNaN(parsedDate.getTime())) {
            return true;
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);
        parsedDate.setHours(0, 0, 0, 0);

        return parsedDate >= today;
    }


    function getDisplayStatus(booking) {
        if (isCancelled(booking)) {
            return {
                label: "Cancelled",
                className: "status-cancelled"
            };
        }

        if (isCompleted(booking)) {
            return {
                label: "Completed",
                className: "status-completed"
            };
        }

        if (isPending(booking)) {
            return {
                label: "Pending",
                className: "status-pending"
            };
        }

        return {
            label: "Upcoming",
            className: "status-upcoming"
        };
    }


    /* =====================================================
       7. FORMATTERS
    ===================================================== */

    function formatDate(dateValue) {
        if (!dateValue) {
            return "Date not specified";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return String(dateValue);
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }


    function formatPrice(priceValue) {
        if (priceValue === null || priceValue === undefined) {
            return "Price on request";
        }

        const numericPrice = Number(
            String(priceValue).replace(/[₹,\s]/g, "")
        );

        if (!Number.isFinite(numericPrice)) {
            return String(priceValue);
        }

        return numericPrice.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        });
    }


    function formatPropertyType(value) {
        return String(value || "Residential Property")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, character =>
                character.toUpperCase()
            );
    }


    /* =====================================================
       8. CREATE CANCELLED TAB IF MISSING
    ===================================================== */

    function ensureCancelledTab() {
        if (!bookingTabsContainer) {
            return;
        }

        const existingTab =
            bookingTabsContainer.querySelector(
                '[data-filter="cancelled"]'
            );

        if (existingTab) {
            return;
        }

        const cancelledTab = document.createElement("button");

        cancelledTab.type = "button";
        cancelledTab.className = "booking-tab";
        cancelledTab.dataset.filter = "cancelled";
        cancelledTab.setAttribute("role", "tab");
        cancelledTab.setAttribute("aria-selected", "false");

        cancelledTab.innerHTML = `
            Cancelled
            <span class="booking-tab-count" id="cancelledCount">0</span>
        `;

        bookingTabsContainer.appendChild(cancelledTab);
    }


    /* =====================================================
       9. BOOKING COUNTS
    ===================================================== */

    function updateCounts() {
        const total = bookings.length;

        const upcoming = bookings.filter(
            isUpcoming
        ).length;

        const completed = bookings.filter(
            isCompleted
        ).length;

        const cancelled = bookings.filter(
            isCancelled
        ).length;

        if (totalBookings) {
            totalBookings.textContent = total;
        }

        if (upcomingBookings) {
            upcomingBookings.textContent = upcoming;
        }

        if (completedBookings) {
            completedBookings.textContent = completed;
        }

        if (allCount) {
            allCount.textContent = total;
        }

        if (upcomingCount) {
            upcomingCount.textContent = upcoming;
        }

        if (completedCount) {
            completedCount.textContent = completed;
        }

        const cancelledCount =
            document.getElementById("cancelledCount");

        if (cancelledCount) {
            cancelledCount.textContent = cancelled;
        }

        if (sidebarBookingCount) {
            sidebarBookingCount.textContent = total;
        }

        document.querySelectorAll(
            "[data-booking-count]"
        ).forEach(element => {
            const type = element.dataset.bookingCount;

            if (type === "all") {
                element.textContent = total;
            } else if (type === "upcoming") {
                element.textContent = upcoming;
            } else if (type === "completed") {
                element.textContent = completed;
            } else if (type === "cancelled") {
                element.textContent = cancelled;
            }
        });
    }


    /* =====================================================
       10. FILTER BOOKINGS
    ===================================================== */

    function getFilteredBookings() {
        let filteredBookings = bookings.map(
            (booking, originalIndex) => ({
                booking,
                originalIndex
            })
        );

        if (activeFilter === "upcoming") {
            filteredBookings = filteredBookings.filter(
                item => isUpcoming(item.booking)
            );
        } else if (activeFilter === "completed") {
            filteredBookings = filteredBookings.filter(
                item => isCompleted(item.booking)
            );
        } else if (activeFilter === "cancelled") {
            filteredBookings = filteredBookings.filter(
                item => isCancelled(item.booking)
            );
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();

            filteredBookings = filteredBookings.filter(
                ({ booking, originalIndex }) => {
                    const searchableValues = [
                        getPropertyName(booking),
                        getPropertyLocation(booking),
                        getBookingReference(
                            booking,
                            originalIndex
                        ),
                        getBookingType(booking),
                        getBookingStatus(booking),
                        getBookingDate(booking)
                    ];

                    return searchableValues.some(value =>
                        String(value)
                            .toLowerCase()
                            .includes(query)
                    );
                }
            );
        }

        return filteredBookings;
    }


    /* =====================================================
       11. EMPTY STATE
    ===================================================== */

    function updateEmptyState(filteredCount) {
        if (!emptyState) {
            return;
        }

        const shouldShow = filteredCount === 0;

        emptyState.hidden = !shouldShow;

        if (bookingList) {
            bookingList.hidden = shouldShow;
        }

        if (!shouldShow) {
            return;
        }

        if (searchQuery) {
            if (emptyStateTitle) {
                emptyStateTitle.textContent =
                    "No matching bookings";
            }

            if (emptyStateMessage) {
                emptyStateMessage.textContent =
                    "We couldn't find a booking matching your search. Try another property name, location, or booking reference.";
            }

            return;
        }

        const emptyMessages = {
            all: {
                title: "No bookings yet",
                message:
                    "Your property visits and bookings will appear here. Explore HomeNest to discover your next home."
            },

            upcoming: {
                title: "No upcoming bookings",
                message:
                    "You don't have any upcoming property visits right now. Explore available properties to schedule a visit."
            },

            completed: {
                title: "No past bookings",
                message:
                    "Your completed property visits will appear here once you have finished a visit."
            },

            cancelled: {
                title: "No cancelled bookings",
                message:
                    "Bookings that you cancel will appear here."
            }
        };

        const message =
            emptyMessages[activeFilter] ||
            emptyMessages.all;

        if (emptyStateTitle) {
            emptyStateTitle.textContent = message.title;
        }

        if (emptyStateMessage) {
            emptyStateMessage.textContent = message.message;
        }
    }


    /* =====================================================
       12. RENDER A BOOKING CARD
    ===================================================== */

    function createBookingCard(booking, originalIndex) {
        const propertyName = escapeHTML(
            getPropertyName(booking)
        );

        const propertyLocation = escapeHTML(
            getPropertyLocation(booking)
        );

        const propertyImage = escapeHTML(
            getPropertyImage(booking)
        );

        const propertyType = escapeHTML(
            formatPropertyType(getBookingType(booking))
        );

        const bookingReference = escapeHTML(
            getBookingReference(booking, originalIndex)
        );

        const bookingDate = escapeHTML(
            formatDate(getBookingDate(booking))
        );

        const bookingTime = escapeHTML(
            getBookingTime(booking)
        );

        const price = escapeHTML(
            formatPrice(getPropertyPrice(booking))
        );

        const status = getDisplayStatus(booking);

        const statusLabel = escapeHTML(status.label);

        const cancelled = isCancelled(booking);
        const completed = isCompleted(booking);

        const propertyId =
            booking.propertyId ||
            booking.property_id ||
            booking.propertyID ||
            booking.id;

        const detailsLink = propertyId !== undefined &&
            propertyId !== null
            ? `property-details.html?id=${encodeURIComponent(propertyId)}`
            : "properties.html";

        const safeDetailsLink = escapeHTML(
            safeLink(detailsLink)
        );

        let actionButtons = "";

        if (!cancelled && !completed) {
            actionButtons = `
                <a
                    class="booking-primary-action"
                    href="${safeDetailsLink}"
                >
                    View Property
                    <span aria-hidden="true">→</span>
                </a>

                <button
                    type="button"
                    class="booking-remove-btn"
                    data-cancel-booking="${originalIndex}"
                    aria-label="Cancel booking ${bookingReference}"
                >
                    Cancel Booking
                </button>
            `;
        } else {
            actionButtons = `
                <a
                    class="booking-secondary-action"
                    href="${safeDetailsLink}"
                >
                    View Property
                    <span aria-hidden="true">→</span>
                </a>
            `;
        }

        return `
            <article class="booking-card">

                <div class="booking-card-header">

                    <div class="booking-reference">
                        <span>Booking ID:</span>
                        <strong>${bookingReference}</strong>
                    </div>

                    <span class="booking-status ${status.className}">
                        ${statusLabel}
                    </span>

                </div>

                <div class="booking-property">

                    <div class="booking-property-image">
                        <img
                            src="${propertyImage}"
                            alt="${propertyName}"
                            loading="lazy"
                            data-fallback-image="true"
                        >
                    </div>

                    <div class="booking-property-info">

                        <span class="booking-property-category">
                            <span aria-hidden="true">⌂</span>
                            ${propertyType}
                        </span>

                        <h3>${propertyName}</h3>

                        <p class="booking-property-location">
                            <span aria-hidden="true">📍</span>
                            <span>${propertyLocation}</span>
                        </p>

                        <div class="booking-property-price">
                            ${price}
                        </div>

                    </div>

                </div>

                <div class="booking-details">

                    <div class="booking-detail-item">
                        <span class="booking-detail-label">
                            Visit Date
                        </span>

                        <span class="booking-detail-value">
                            ${bookingDate}
                        </span>
                    </div>

                    <div class="booking-detail-item">
                        <span class="booking-detail-label">
                            Visit Time
                        </span>

                        <span class="booking-detail-value">
                            ${bookingTime}
                        </span>
                    </div>

                    <div class="booking-detail-item">
                        <span class="booking-detail-label">
                            Booking Status
                        </span>

                        <span class="booking-detail-value">
                            ${statusLabel}
                        </span>
                    </div>

                </div>

                <div class="booking-card-actions">
                    ${actionButtons}
                </div>

            </article>
        `;
    }


    /* =====================================================
       13. RENDER ALL BOOKINGS
    ===================================================== */

    function renderBookings() {
        updateCounts();

        if (!bookingList) {
            console.warn(
                "HomeNest: #bookingList element was not found."
            );

            return;
        }

        const filteredBookings = getFilteredBookings();

        updateEmptyState(filteredBookings.length);

        if (filteredBookings.length === 0) {
            bookingList.innerHTML = "";
            return;
        }

        bookingList.innerHTML = filteredBookings
            .map(({ booking, originalIndex }) =>
                createBookingCard(booking, originalIndex)
            )
            .join("");

        bookingList
            .querySelectorAll("[data-fallback-image]")
            .forEach(image => {
                image.addEventListener(
                    "error",
                    () => {
                        image.onerror = null;

                        image.src =
                            "assets/images/property-1.jpg";
                    },
                    { once: true }
                );
            });
    }

        /* =====================================================
       14. BOOKING TAB INTERACTIONS
    ===================================================== */

    function updateActiveTab() {
        document.querySelectorAll(".booking-tab").forEach(
            tab => {
                const isActive =
                    tab.dataset.filter === activeFilter;

                tab.classList.toggle("active", isActive);

                tab.setAttribute(
                    "aria-selected",
                    String(isActive)
                );
            }
        );
    }


    function handleTabClick(event) {
        const tab = event.target.closest(".booking-tab");

        if (!tab) {
            return;
        }

        activeFilter = tab.dataset.filter || "all";

        updateActiveTab();
        renderBookings();
    }


    if (bookingTabsContainer) {
        bookingTabsContainer.addEventListener(
            "click",
            handleTabClick
        );
    }


    /* =====================================================
       15. SEARCH BOOKINGS
    ===================================================== */

    if (bookingSearch) {
        bookingSearch.addEventListener("input", event => {
            searchQuery = event.target.value.trim();

            renderBookings();
        });
    }


    /* =====================================================
       16. CANCEL BOOKING MODAL
    ===================================================== */

    function openCancelModal(index) {
        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= bookings.length
        ) {
            showToast(
                "This booking could not be found.",
                "error"
            );

            return;
        }

        if (
            isCancelled(bookings[index]) ||
            isCompleted(bookings[index])
        ) {
            showToast(
                "This booking can no longer be cancelled.",
                "info"
            );

            return;
        }

        bookingToCancel = index;

        if (!cancelModal) {
            const shouldCancel = window.confirm(
                "Are you sure you want to cancel this booking?"
            );

            if (shouldCancel) {
                cancelBooking();
            }

            return;
        }

        cancelModal.classList.add("active");
        cancelModal.classList.add("show");

        cancelModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        if (keepBookingBtn) {
            keepBookingBtn.focus();
        }
    }


    function closeCancelModal() {
        if (!cancelModal) {
            return;
        }

        cancelModal.classList.remove("active");
        cancelModal.classList.remove("show");

        cancelModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

        bookingToCancel = null;
    }


    function cancelBooking() {
        if (
            !Number.isInteger(bookingToCancel) ||
            bookingToCancel < 0 ||
            bookingToCancel >= bookings.length
        ) {
            closeCancelModal();

            showToast(
                "Unable to find the selected booking.",
                "error"
            );

            return;
        }

        const selectedBooking = bookings[bookingToCancel];

        if (
            isCancelled(selectedBooking) ||
            isCompleted(selectedBooking)
        ) {
            closeCancelModal();

            showToast(
                "This booking can no longer be cancelled.",
                "info"
            );

            return;
        }

        /*
         * Keep the booking in localStorage.
         * Update its status instead of deleting it.
         */

        const previousStatus = selectedBooking.status;
        const previousBookingStatus = selectedBooking.bookingStatus;
        const previousBookingStatusSnake =
            selectedBooking.booking_status;

        selectedBooking.status = "cancelled";

        const saved = saveBookings();

        if (!saved) {
            if (previousStatus === undefined) {
                delete selectedBooking.status;
            } else {
                selectedBooking.status = previousStatus;
            }

            if (previousBookingStatus === undefined) {
                delete selectedBooking.bookingStatus;
            } else {
                selectedBooking.bookingStatus = previousBookingStatus;
            }

            if (previousBookingStatusSnake === undefined) {
                delete selectedBooking.booking_status;
            } else {
                selectedBooking.booking_status =
                    previousBookingStatusSnake;
            }

            closeCancelModal();
            return;
        }

        closeCancelModal();

        renderBookings();

        showToast(
            "Booking cancelled successfully.",
            "success"
        );
    }


    if (bookingList) {
        bookingList.addEventListener("click", event => {
            const cancelButton = event.target.closest(
                "[data-cancel-booking]"
            );

            if (!cancelButton) {
                return;
            }

            const index = Number(
                cancelButton.dataset.cancelBooking
            );

            openCancelModal(index);
        });
    }


    if (keepBookingBtn) {
        keepBookingBtn.addEventListener(
            "click",
            closeCancelModal
        );
    }


    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener(
            "click",
            cancelBooking
        );
    }


    if (cancelModal) {
        cancelModal.addEventListener("click", event => {
            if (event.target === cancelModal) {
                closeCancelModal();
            }
        });
    }


    /* =====================================================
       17. TOAST NOTIFICATIONS
    ===================================================== */

    function showToast(message, type = "info") {
        if (!toastContainer) {
            console.log(`HomeNest: ${message}`);
            return;
        }

        const toast = document.createElement("div");

        toast.className = `toast ${type}`;
        toast.setAttribute("role", "status");

        const iconMap = {
            success: "✓",
            error: "!",
            info: "i"
        };

        const icon = iconMap[type] || "i";

        const iconElement = document.createElement("span");
        iconElement.className = "toast-icon";
        iconElement.setAttribute("aria-hidden", "true");
        iconElement.textContent = icon;

        const messageElement = document.createElement("span");
        messageElement.className = "toast-message";
        messageElement.textContent = message;

        toast.appendChild(iconElement);
        toast.appendChild(messageElement);

        toastContainer.appendChild(toast);

        window.setTimeout(() => {
            toast.classList.add("removing");

            window.setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3200);
    }


   
    /* =====================================================
       18. DASHBOARD SIDEBAR
    ===================================================== */

    function openDashboardSidebar() {
        if (!dashboardSidebar) {
            return;
        }

        dashboardSidebar.classList.add("open");
        dashboardSidebar.classList.add("active");

        if (dashboardOverlay) {
            dashboardOverlay.classList.add("active");
        }

        document.body.classList.add("dashboard-menu-open");

        if (dashboardSidebarToggle) {
            dashboardSidebarToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeDashboardSidebar() {
        if (dashboardSidebar) {
            dashboardSidebar.classList.remove("open");
            dashboardSidebar.classList.remove("active");
        }

        if (dashboardOverlay) {
            dashboardOverlay.classList.remove("active");
        }

        document.body.classList.remove("dashboard-menu-open");

        if (dashboardSidebarToggle) {
            dashboardSidebarToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    if (dashboardSidebarToggle) {
        dashboardSidebarToggle.addEventListener(
            "click",
            () => {
                const isOpen =
                    dashboardSidebar?.classList.contains("open");

                if (isOpen) {
                    closeDashboardSidebar();
                } else {
                    openDashboardSidebar();
                }
            }
        );
    }


    if (dashboardOverlay) {
        dashboardOverlay.addEventListener(
            "click",
            closeDashboardSidebar
        );
    }


    /* Sidebar links stay on My Bookings page */
    if (dashboardSidebar) {
        const sidebarLinks = dashboardSidebar.querySelectorAll(
            ".sidebar-link, .sidebar-bottom-link"
        );

        sidebarLinks.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();

                // Keep the current page unchanged.
                // No navigation and no page reload.
            });
        });
    }


    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeDashboardSidebar();
        }
    });




    /*
     * SIDEBAR LINK UPDATE:
     * Dashboard, Favorites, My Profile, Messages and
     * other sidebar links stay on the same page.
     * Clicking them will not navigate to another page.
     */

    if (dashboardSidebar) {
        const sidebarLinks = dashboardSidebar.querySelectorAll(
            ".sidebar-link, .sidebar-bottom-link"
        );

        sidebarLinks.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();

                /*
                 * Keep the sidebar open and remain on
                 * the current My Bookings page.
                 */
            });
        });
    }


    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeDashboardSidebar();
        }
    });

        /* =====================================================
       19. EXISTING MOBILE NAVIGATION
    ===================================================== */

    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener("click", () => {
            const isOpen =
                mainNavigation.classList.contains("open") ||
                mainNavigation.classList.contains("active");

            mainNavigation.classList.toggle("open", !isOpen);
            mainNavigation.classList.toggle("active", !isOpen);

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            mobileMenuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation menu" : "Close navigation menu"
            );
        });

        mainNavigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNavigation.classList.remove("open");
                mainNavigation.classList.remove("active");

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                mainNavigation.classList.remove("open");
                mainNavigation.classList.remove("active");

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    /* =====================================================
       20. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeaderOnScroll() {
        if (!siteHeader) {
            return;
        }

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 15
        );
    }

    window.addEventListener(
        "scroll",
        updateHeaderOnScroll,
        { passive: true }
    );

    updateHeaderOnScroll();


    /* =====================================================
       21. FOOTER YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       22. ESCAPE KEY HANDLING
    ===================================================== */

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") {
            return;
        }

        closeDashboardSidebar();
        closeCancelModal();

        if (mainNavigation && mobileMenuToggle) {
            mainNavigation.classList.remove("open");
            mainNavigation.classList.remove("active");

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });


    /* =====================================================
       23. PAGE LOADER
    ===================================================== */

    function hidePageLoader() {
        if (!pageLoader) {
            return;
        }

        pageLoader.classList.add("hidden");
        pageLoader.classList.add("loaded");
    }


    window.addEventListener(
        "load",
        hidePageLoader,
        { once: true }
    );

    /*
     * Fallback in case the load event has already fired
     * or an image/resource takes longer than expected.
     */

    window.setTimeout(hidePageLoader, 1800);


    /* =====================================================
       24. INITIALIZE DASHBOARD
    ===================================================== */

    ensureCancelledTab();

    updateActiveTab();

    renderBookings();

});

/* =========================================
   GLOBAL FAVOURITES NAV COUNT
   HomeNest — Shared Across Pages
========================================= */

(function () {
    "use strict";

    const FAVORITES_KEY = "homenest-favourites";

    function updateFavoritesNavCount() {
        let favorites = [];

        try {
            const storedFavorites = JSON.parse(
                localStorage.getItem(FAVORITES_KEY) || "[]"
            );

            if (Array.isArray(storedFavorites)) {
                favorites = [
                    ...new Set(
                        storedFavorites.map(String)
                    )
                ];
            }
        } catch (error) {
            console.error(
                "HomeNest: Unable to read favourites.",
                error
            );
        }

        /* Update only favourite counts in navigation links */
        document.querySelectorAll(
            ".favorite-nav-link .favorite-count, " +
            ".favorite-nav-link [data-favorite-count], " +
            "[data-favorites-link] [data-favorite-count]"
        ).forEach((countElement) => {
            countElement.textContent = String(
                favorites.length
            );
        });

        /* Keep the navigation heart linked to Favorites */
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

    /* Initial count when the page opens */
    updateFavoritesNavCount();

    /* Changes made in another browser tab */
    window.addEventListener("storage", (event) => {
        if (
            event.key === FAVORITES_KEY ||
            event.key === null
        ) {
            updateFavoritesNavCount();
        }
    });

    /* Changes made by other scripts in the same tab */
    window.addEventListener(
        "homenest:favorites-updated",
        updateFavoritesNavCount
    );

    /* Refresh the count when returning to this page */
    window.addEventListener(
        "pageshow",
        updateFavoritesNavCount
    );

})();