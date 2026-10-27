
/* =========================================================
   STACKLY HOMENEST — HOMEPAGE INTERACTIONS
   Keeps the existing HTML IDs and localStorage favourites key
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");
  const toastContainer = document.getElementById("toastContainer");
  const propertySearch = document.getElementById("propertySearch");
  const footerSubscribe = document.getElementById("footerSubscribe");
  const featuredProperties = document.getElementById("featuredProperties");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================================
     PRELOADER
  ========================================================= */

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("hidden");
    preloader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-loading");
  };

  document.body.classList.add("is-loading");

  if (document.readyState === "complete") {
    window.setTimeout(hidePreloader, 220);
  } else {
    window.addEventListener(
      "load",
      () => window.setTimeout(hidePreloader, 220),
      { once: true }
    );
  }

  // Fallback: loader should never remain stuck.
  window.setTimeout(hidePreloader, 1800);

  // Support the existing fast-navigation loader flag.
  if (sessionStorage.getItem("stacklySkipLoader") === "1") {
    sessionStorage.removeItem("stacklySkipLoader");
    hidePreloader();
  }

  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navMenu.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
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

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }

 /* =========================================================
ACTIVE NAVIGATION LINK
========================================================= */

function updateActiveLink() {
const currentFile = (
window.location.pathname.split("/").pop() || "index.html"
).toLowerCase();


const currentHash = window.location.hash;

document.querySelectorAll(".site-header .nav-link").forEach((link) => {
  const href = link.getAttribute("href") || "";

  if (!href || href.startsWith("javascript:")) return;

  let isActive = false;

  try {
    const url = new URL(href, window.location.href);

    const linkFile = (
      url.pathname.split("/").pop() || "index.html"
    ).toLowerCase();

    if (url.origin !== window.location.origin) {
      isActive = false;
    } else if (linkFile === "index.html") {
      if (url.hash) {
        // About/Contact become active only at their own section.
        isActive =
          currentFile === "index.html" &&
          currentHash === url.hash;
      } else {
        // Homepage is active only when no section hash exists.
        isActive =
          currentFile === "index.html" &&
          currentHash === "";
      }
    } else {
      // Other pages: activate only the matching page.
      isActive =
        linkFile === currentFile &&
        currentHash === "";
    }
  } catch {
    isActive = false;
  }

  link.classList.toggle("active", isActive);

  if (isActive) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});


}

updateActiveLink();

window.addEventListener("pageshow", updateActiveLink);
window.addEventListener("hashchange", updateActiveLink);



  /* =========================================================
     HEADER SHADOW + BACK TO TOP
  ========================================================= */

  const onScroll = () => {
    const y =
      window.scrollY || document.documentElement.scrollTop;

    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", y > 12);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", y > 450);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  /* =========================================================
     SCROLL REVEAL ANIMATIONS
  ========================================================= */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  /* =========================================================
     TOAST NOTIFICATIONS
  ========================================================= */

  const showToast = (message, type = "success") => {
    if (!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = `toast-message ${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;

    toastContainer.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";

      window.setTimeout(() => {
        toast.remove();
      }, 250);
    }, 3200);
  };

  /* =========================================================
     PROPERTY SEARCH
     Location + Type + Price → properties.html
  ========================================================= */

  if (propertySearch) {
    propertySearch.addEventListener("submit", (event) => {
      event.preventDefault();

      const location =
        document.getElementById("searchLocation")?.value.trim() || "";

      const type =
        document.getElementById("propertyType")?.value || "";

      const price =
        document.getElementById("priceRange")?.value || "";

      const params = new URLSearchParams();

      if (location) {
        params.set("location", location);
      }

      if (type) {
        params.set("type", type);
      }

      if (price) {
        params.set("price", price);
      }

      const query = params.toString();

      window.location.href = `properties.html${
        query ? `?${query}` : ""
      }`;
    });
  }

  /* =========================================================
     FAVOURITES
     Preserve existing localStorage key
  ========================================================= */

  const FAVOURITES_KEY = "homenest-favourites";

  const readFavourites = () => {
    try {
      const value = JSON.parse(
        localStorage.getItem(FAVOURITES_KEY) || "[]"
      );

      return Array.isArray(value) ? value.map(String) : [];
    } catch {
      return [];
    }
  };

  const saveFavourites = (values) => {
  // Save favourites using the existing LocalStorage key
  localStorage.setItem(
    FAVOURITES_KEY,
    JSON.stringify(values)
  );

  // Update the header count immediately
  updateFavoritesNavCount();

  // Notify other favourite-related scripts
  window.dispatchEvent(
    new CustomEvent("homenest:favorites-updated")
  );
};
  const syncFavouriteButtons = () => {
    const favourites = readFavourites();

    document.querySelectorAll("[data-favorite-id]").forEach((button) => {
      const isFavorite = favourites.includes(
        String(button.dataset.favoriteId)
      );

      button.classList.toggle("is-favorite", isFavorite);

      button.setAttribute(
        "aria-pressed",
        String(isFavorite)
      );

      const icon = button.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-solid", isFavorite);
        icon.classList.toggle("fa-regular", !isFavorite);
      }
    });
  };

  syncFavouriteButtons();

  if (featuredProperties) {
    featuredProperties.addEventListener("click", (event) => {
      const button = event.target.closest("[data-favorite-id]");

      if (!button) return;

      const id = String(button.dataset.favoriteId);
      const favourites = readFavourites();
      const index = favourites.indexOf(id);

      if (index >= 0) {
        favourites.splice(index, 1);
        showToast("Removed from your favourites.");
      } else {
        favourites.push(id);
        showToast("Added to your favourites.");
      }

      saveFavourites(favourites);
      syncFavouriteButtons();
    });
  }

  /* =========================================================
     FOOTER SUBSCRIPTION
  ========================================================= */

  if (footerSubscribe) {
    footerSubscribe.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("subscribeEmail");

      if (!email || !email.checkValidity()) {
        email?.reportValidity();
        return;
      }

      showToast(
        "Thank you! Our team will reach out to you soon."
      );

      footerSubscribe.reset();
    });
  }

  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "1") return;

      img.dataset.fallbackApplied = "1";

      if (
        img.classList.contains("brand-logo") ||
        img.classList.contains("loader-logo")
      ) {
        img.style.visibility = "hidden";
      } else {
        img.style.background =
          "linear-gradient(135deg, #dce8ed, #b8dcd6)";

        img.style.minHeight = "100px";
        img.alt = img.alt || "Property image";
      }
    });
  });

  /* =========================================================
     FAST INTERNAL PAGE NAVIGATION
  ========================================================= */

  document
    .querySelectorAll('a[href$=".html"], a[href*=".html?"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#") || href.startsWith("http")) {
          return;
        }

        try {
          const destination = new URL(
            href,
            window.location.href
          );

          if (
            destination.origin === window.location.origin &&
            destination.pathname !== window.location.pathname
          ) {
            sessionStorage.setItem("stacklySkipLoader", "1");
          }
        } catch {
          // Leave normal navigation untouched.
        }
      });
    });
});


/* =========================================
   GLOBAL FAVOURITES NAV COUNT
========================================= */

function updateFavoritesNavCount() {
    const FAVORITES_KEY = "homenest-favourites";

    let favorites = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

        if (Array.isArray(saved)) {
            favorites = saved;
        }
    } catch (error) {
        console.error("Unable to read favourites:", error);
    }

    document.querySelectorAll(
        "#favoriteCount, #favoritesCount, [data-favorite-count]"
    ).forEach((countElement) => {
        countElement.textContent = String(favorites.length);
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

/* Update when favourites change in another browser tab */
window.addEventListener("storage", (event) => {
    if (
        event.key === "homenest-favourites" ||
        event.key === null
    ) {
        updateFavoritesNavCount();
    }
});

/* Update when existing favourite scripts dispatch this event */
window.addEventListener(
    "homenest:favorites-updated",
    updateFavoritesNavCount
);

