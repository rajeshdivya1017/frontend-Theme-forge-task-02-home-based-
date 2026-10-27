
/* =========================================
   HOMENEST — LOGIN PAGE
   Frontend Demo Authentication
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================
       DOM ELEMENTS
    ===================================== */

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    const formMessage = document.getElementById("formMessage");
    const loginSubmit = document.getElementById("loginSubmit");

    const pageLoader = document.getElementById("pageLoader");

    const PROFILE_KEY = "homenest-user-profile";
    const SESSION_KEY = "homenest-session";

    /* =====================================
       PAGE LOADER
    ===================================== */

    function hidePageLoader() {
        if (!pageLoader) return;

        pageLoader.classList.add("loaded");

        window.setTimeout(() => {
            pageLoader.style.display = "none";
        }, 500);
    }

    if (document.readyState === "complete") {
        window.setTimeout(hidePageLoader, 150);
    } else {
        window.addEventListener("load", hidePageLoader, {
            once: true
        });

        window.setTimeout(hidePageLoader, 1800);
    }

    /* =====================================
       FORM MESSAGES
    ===================================== */

    function showMessage(message, type = "error") {
        if (!formMessage) {
            alert(message);
            return;
        }

        formMessage.textContent = message;

        formMessage.classList.remove(
            "success",
            "error",
            "info"
        );

        formMessage.classList.add(type);
        formMessage.hidden = false;
        formMessage.setAttribute("role", "alert");
    }

    function clearMessage() {
        if (!formMessage) return;

        formMessage.textContent = "";
        formMessage.hidden = true;

        formMessage.classList.remove(
            "success",
            "error",
            "info"
        );
    }

    /* =====================================
       VALIDATION
    ===================================== */

    function validateEmail(value) {
        const email = value.trim();

        if (!email) {
            return "Please enter your email address.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            return "Please enter a valid email address.";
        }

        return "";
    }

    function validatePassword(value) {
        if (!value) {
            return "Please enter your password.";
        }

        return "";
    }

    function showFieldError(input, message) {
        if (!input) return;

        input.classList.toggle("invalid", Boolean(message));
        input.classList.toggle("is-invalid", Boolean(message));

        input.setAttribute(
            "aria-invalid",
            String(Boolean(message))
        );

        const parent = input.closest(".form-group");

        const errorElement = parent?.querySelector(
            ".field-error, .error-message, .input-error"
        );

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.hidden = !message;
        }
    }

    /* =====================================
       SHOW / HIDE PASSWORD
    ===================================== */

    function setupPasswordToggle() {
        if (!passwordInput) return;

        const container = passwordInput.closest(
            ".password-wrapper, .password-input-wrapper"
        );

        const toggle =
            container?.querySelector(
                ".password-toggle, .toggle-password, [data-toggle-password]"
            ) ||
            passwordInput.parentElement?.querySelector(
                ".password-toggle, .toggle-password, [data-toggle-password]"
            );

        if (!toggle) return;

        toggle.addEventListener("click", () => {
            const showPassword =
                passwordInput.type === "password";

            passwordInput.type = showPassword
                ? "text"
                : "password";

            toggle.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );

            const icon = toggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-eye", !showPassword);
                icon.classList.toggle("fa-eye-slash", showPassword);
            }
        });
    }

    setupPasswordToggle();

    /* =====================================
       LIVE VALIDATION
    ===================================== */

    if (emailInput) {
        emailInput.addEventListener("input", () => {
            showFieldError(emailInput, "");
            clearMessage();
        });

        emailInput.addEventListener("blur", () => {
            showFieldError(
                emailInput,
                validateEmail(emailInput.value)
            );
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", () => {
            showFieldError(passwordInput, "");
            clearMessage();
        });
    }

    /* =====================================
       REMEMBER ME
    ===================================== */

    if (emailInput && rememberMe) {
        try {
            const rememberedEmail =
                localStorage.getItem("homenest-remembered-email");

            if (rememberedEmail) {
                emailInput.value = rememberedEmail;
                rememberMe.checked = true;
            }
        } catch (error) {
            console.warn("Remember Me is unavailable in this browser.");
        }
    }

    /* =====================================
       LOGIN SUBMIT
    ===================================== */

    if (!loginForm) {
        console.error("HomeNest: loginForm element was not found.");
        return;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearMessage();

        const email = emailInput?.value.trim().toLowerCase() || "";
        const password = passwordInput?.value || "";

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        showFieldError(emailInput, emailError);
        showFieldError(passwordInput, passwordError);

        if (emailError || passwordError) {
            showMessage(
                "Please correct the highlighted fields.",
                "error"
            );

            if (emailError) {
                emailInput?.focus();
            } else {
                passwordInput?.focus();
            }

            return;
        }

        /*
         * This is a frontend demo only.
         * It cannot securely verify a password because
         * registration is not connected to a backend.
         */

        let profile;

        try {
            const savedProfile = localStorage.getItem(PROFILE_KEY);

            if (!savedProfile) {
                showMessage(
                    "No demo account found. Please register first.",
                    "error"
                );

                return;
            }

            profile = JSON.parse(savedProfile);

        } catch (error) {
            showMessage(
                "Unable to read your account details. Please register again.",
                "error"
            );

            return;
        }

        if (
            !profile ||
            typeof profile.email !== "string" ||
            profile.email.toLowerCase() !== email
        ) {
            showMessage(
                "This email does not match the registered demo account.",
                "error"
            );

            return;
        }

        try {
            const session = {
                email: profile.email,
                fullName: profile.fullName || "",
                loggedInAt: new Date().toISOString()
            };

            const storage = rememberMe?.checked
                ? localStorage
                : sessionStorage;

            storage.setItem(
                SESSION_KEY,
                JSON.stringify(session)
            );

            if (rememberMe?.checked) {
                localStorage.setItem(
                    "homenest-remembered-email",
                    email
                );
            } else {
                localStorage.removeItem(
                    "homenest-remembered-email"
                );
            }

        } catch (error) {
            showMessage(
                "Unable to create a demo session. Please check your browser storage.",
                "error"
            );

            return;
        }

        if (loginSubmit) {
            loginSubmit.disabled = true;
            loginSubmit.setAttribute("aria-busy", "true");

            loginSubmit.dataset.originalText =
                loginSubmit.innerHTML;

            loginSubmit.textContent = "Signing In...";
        }

        showMessage(
            "Demo sign-in successful. Opening your dashboard...",
            "success"
        );

        window.setTimeout(() => {
            window.location.href = "my-bookings.html";
        }, 700);
    });

    /* =====================================
       FORGOT PASSWORD
    ===================================== */

    const forgotPasswordLink = document.querySelector(
        "#forgotPassword, .forgot-password, [data-forgot-password]"
    );

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (event) => {
            event.preventDefault();

            showMessage(
                "Password recovery is not connected yet. A backend authentication service is required.",
                "info"
            );
        });
    }

});

