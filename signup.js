
/* =========================================
   HOMENEST — SIGNUP
   Form Validation + Demo Registration
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const signupForm = document.getElementById("signupForm");

    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    // IMPORTANT: Match the IDs in your HTML.
    const termsCheckbox = document.getElementById("agreeTerms");

    const formMessage = document.getElementById("formMessage");
    const signupSubmit = document.getElementById("signupSubmit");
    const pageLoader = document.getElementById("pageLoader");

    const PROFILE_KEY = "homenest-user-profile";

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
        window.setTimeout(hidePageLoader, 100);
    } else {
        window.addEventListener("load", hidePageLoader, {
            once: true
        });

        window.setTimeout(hidePageLoader, 1800);
    }

    /* =====================================
       FORM MESSAGE
    ===================================== */

    function showMessage(message, type = "error") {
        if (!formMessage) {
            alert(message);
            return;
        }

        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.hidden = false;
    }

    function clearMessage() {
        if (!formMessage) return;

        formMessage.textContent = "";
        formMessage.hidden = true;
        formMessage.className = "form-message";
    }

    /* =====================================
       FIELD ERRORS
    ===================================== */

    function showFieldError(input, message) {
        if (!input) return;

        input.classList.toggle("invalid", Boolean(message));
        input.setAttribute(
            "aria-invalid",
            String(Boolean(message))
        );

        const errorId = `${input.id}Error`;
        const errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.hidden = !message;
        }
    }

    /* =====================================
       VALIDATION
    ===================================== */

    function validateName(value) {
        const name = value.trim();

        if (!name) {
            return "Please enter your full name.";
        }

        if (name.length < 2 || name.length > 80) {
            return "Name must contain 2 to 80 characters.";
        }

        if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name)) {
            return "Please enter a valid name.";
        }

        return "";
    }

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

    function validatePhone(value) {
        const phone = value.trim();
        const digits = phone.replace(/\D/g, "");

        if (!phone) {
            return "Please enter your phone number.";
        }

        if (!/^[+\d\s()-]+$/.test(phone)) {
            return "Please enter a valid phone number.";
        }

        if (digits.length < 10 || digits.length > 15) {
            return "Enter a phone number containing 10 to 15 digits.";
        }

        return "";
    }

    function validatePassword(value) {
        if (!value) {
            return "Please create a password.";
        }

        if (value.length < 8) {
            return "Password must contain at least 8 characters.";
        }

        if (!/[a-z]/.test(value)) {
            return "Include at least one lowercase letter.";
        }

        if (!/[A-Z]/.test(value)) {
            return "Include at least one uppercase letter.";
        }

        if (!/\d/.test(value)) {
            return "Include at least one number.";
        }

        return "";
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) {
            return "Please confirm your password.";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }

        return "";
    }

    /* =====================================
       PASSWORD STRENGTH
       HTML IDs: strengthBar, strengthText
    ===================================== */

    function updatePasswordStrength(password) {
        const strengthBar = document.getElementById("strengthBar");
        const strengthText = document.getElementById("strengthText");

        if (!strengthBar || !strengthText) return;

        let score = 0;

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { label: "Use at least 8 characters.", width: "0%", className: "" },
            { label: "Very weak password", width: "20%", className: "weak" },
            { label: "Weak password", width: "40%", className: "weak" },
            { label: "Fair password", width: "60%", className: "medium" },
            { label: "Strong password", width: "80%", className: "strong" },
            { label: "Very strong password", width: "100%", className: "very-strong" }
        ];

        const level = password ? levels[score] : levels[0];

        strengthBar.style.width = level.width;

        strengthBar.classList.remove(
            "weak",
            "medium",
            "strong",
            "very-strong"
        );

        strengthText.classList.remove(
            "weak",
            "medium",
            "strong",
            "very-strong"
        );

        if (level.className) {
            strengthBar.classList.add(level.className);
            strengthText.classList.add(level.className);
        }

        strengthText.textContent = level.label;
    }

    /* =====================================
       PASSWORD SHOW / HIDE
       HTML uses data-target
    ===================================== */

    document.querySelectorAll(".password-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);

            if (!input) return;

            const showPassword = input.type === "password";

            input.type = showPassword ? "text" : "password";

            button.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                String(showPassword)
            );

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-eye", !showPassword);
                icon.classList.toggle("fa-eye-slash", showPassword);
                icon.classList.toggle("fa-regular", !showPassword);
                icon.classList.toggle("fa-solid", showPassword);
            }
        });
    });

    /* =====================================
       LIVE VALIDATION
    ===================================== */

    const fields = [
        fullNameInput,
        emailInput,
        phoneInput,
        passwordInput,
        confirmPasswordInput
    ];

    fields.forEach((input) => {
        if (!input) return;

        input.addEventListener("input", () => {
            showFieldError(input, "");
            clearMessage();
        });

        input.addEventListener("blur", () => {
            let error = "";

            switch (input.id) {
                case "fullName":
                    error = validateName(input.value);
                    break;

                case "email":
                    error = validateEmail(input.value);
                    break;

                case "phone":
                    error = validatePhone(input.value);
                    break;

                case "password":
                    error = validatePassword(input.value);
                    break;

                case "confirmPassword":
                    error = validateConfirmPassword(
                        passwordInput.value,
                        input.value
                    );
                    break;
            }

            showFieldError(input, error);
        });
    });

    passwordInput?.addEventListener("input", () => {
        updatePasswordStrength(passwordInput.value);

        if (confirmPasswordInput.value) {
            showFieldError(
                confirmPasswordInput,
                validateConfirmPassword(
                    passwordInput.value,
                    confirmPasswordInput.value
                )
            );
        }
    });

    termsCheckbox?.addEventListener("change", () => {
        showFieldError(
            termsCheckbox,
            termsCheckbox.checked
                ? ""
                : "Please accept the Terms and Conditions."
        );

        clearMessage();
    });

    /* =====================================
       SUBMIT BUTTON
    ===================================== */

    function setSubmitting(isSubmitting) {
        if (!signupSubmit) return;

        signupSubmit.disabled = isSubmitting;

        if (isSubmitting) {
            signupSubmit.dataset.originalHTML =
                signupSubmit.innerHTML;

            signupSubmit.innerHTML =
                '<span>Creating Account...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        } else if (signupSubmit.dataset.originalHTML) {
            signupSubmit.innerHTML =
                signupSubmit.dataset.originalHTML;
        }
    }

    /* =====================================
       REGISTER
    ===================================== */

    if (!signupForm) {
        console.error("HomeNest: #signupForm was not found.");
        return;
    }

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearMessage();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const errors = [
            [fullNameInput, validateName(fullName)],
            [emailInput, validateEmail(email)],
            [phoneInput, validatePhone(phone)],
            [passwordInput, validatePassword(password)],
            [
                confirmPasswordInput,
                validateConfirmPassword(password, confirmPassword)
            ]
        ];

        let firstInvalidInput = null;

        errors.forEach(([input, error]) => {
            showFieldError(input, error);

            if (error && !firstInvalidInput) {
                firstInvalidInput = input;
            }
        });

        if (firstInvalidInput) {
            showMessage(
                "Please correct the highlighted fields.",
                "error"
            );

            firstInvalidInput.focus();
            return;
        }

        if (!termsCheckbox.checked) {
            showFieldError(
                termsCheckbox,
                "Please accept the Terms and Conditions."
            );

            showMessage(
                "Please accept the Terms and Conditions.",
                "error"
            );

            termsCheckbox.focus();
            return;
        }

        /*
         * Frontend demo only.
         * Store profile information, never the password.
         */

        const profile = {
            fullName,
            email,
            phone,
            registeredAt: new Date().toISOString()
        };

        try {
            const existingData =
                localStorage.getItem(PROFILE_KEY);

            if (existingData) {
                try {
                    const existingProfile = JSON.parse(existingData);

                    if (
                        existingProfile.email &&
                        existingProfile.email.toLowerCase() === email
                    ) {
                        showMessage(
                            "This email is already registered. Please sign in.",
                            "error"
                        );
                        return;
                    }
                } catch (error) {
                    console.warn("Replacing invalid demo profile data.");
                }
            }

            localStorage.setItem(
                PROFILE_KEY,
                JSON.stringify(profile)
            );

        } catch (error) {
            console.error("Unable to save registration:", error);

            showMessage(
                "Unable to save your details. Check browser storage and try again.",
                "error"
            );

            return;
        }

        setSubmitting(true);

        showMessage(
            "Account details saved. Redirecting to login...",
            "success"
        );

        window.setTimeout(() => {
            window.location.assign("./login.html");
        }, 500);
    });

});

