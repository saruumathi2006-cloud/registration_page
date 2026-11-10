// DOM Elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const successMessage = document.getElementById('successMessage');

const groupName = document.getElementById('group-name');
const groupEmail = document.getElementById('group-email');
const groupPassword = document.getElementById('group-password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Regular expression for standard email format validation
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// State tracker to avoid aggressive early error display before first user interaction
const touched = {
  name: false,
  email: false,
  password: false
};

/**
 * Validate Full Name field
 * Requirements: Not empty
 */
function validateName(showError = true) {
  const value = nameInput.value.trim();
  let isValid = false;

  if (value === '') {
    if (showError && touched.name) {
      setError(groupName, nameError, 'Name is required and cannot be empty.');
    } else {
      clearValidationState(groupName, nameError);
    }
  } else {
    isValid = true;
    setSuccess(groupName, nameError);
  }

  return isValid;
}

/**
 * Validate Email field
 * Requirements: Valid email format
 */
function validateEmail(showError = true) {
  const value = emailInput.value.trim();
  let isValid = false;

  if (value === '') {
    if (showError && touched.email) {
      setError(groupEmail, emailError, 'Email address is required.');
    } else {
      clearValidationState(groupEmail, emailError);
    }
  } else if (!emailRegex.test(value)) {
    if (showError && touched.email) {
      setError(groupEmail, emailError, 'Please enter a valid email address (e.g. name@example.com).');
    }
  } else {
    isValid = true;
    setSuccess(groupEmail, emailError);
  }

  return isValid;
}

/**
 * Validate Password field
 * Requirements: Minimum 6 characters
 */
function validatePassword(showError = true) {
  const value = passwordInput.value;
  let isValid = false;

  if (value.length === 0) {
    if (showError && touched.password) {
      setError(groupPassword, passwordError, 'Password is required.');
    } else {
      clearValidationState(groupPassword, passwordError);
    }
  } else if (value.length < 6) {
    if (showError && touched.password) {
      setError(groupPassword, passwordError, `Password must be at least 6 characters (currently ${value.length}).`);
    }
  } else {
    isValid = true;
    setSuccess(groupPassword, passwordError);
  }

  return isValid;
}

// Helpers for UI feedback
function setError(groupElement, errorElement, message) {
  groupElement.classList.add('has-error');
  groupElement.classList.remove('is-valid');
  errorElement.textContent = message;
}

function setSuccess(groupElement, errorElement) {
  groupElement.classList.remove('has-error');
  groupElement.classList.add('is-valid');
  errorElement.textContent = '';
}

function clearValidationState(groupElement, errorElement) {
  groupElement.classList.remove('has-error');
  groupElement.classList.remove('is-valid');
  errorElement.textContent = '';
}

/**
 * Check overall form validity and enable/disable submit button
 */
function checkFormValidity() {
  const isNameValid = nameInput.value.trim() !== '';
  const isEmailValid = emailRegex.test(emailInput.value.trim());
  const isPasswordValid = passwordInput.value.length >= 6;

  const allValid = isNameValid && isEmailValid && isPasswordValid;
  submitBtn.disabled = !allValid;

  return allValid;
}

// Real-time Event Listeners

// Name listeners
nameInput.addEventListener('input', () => {
  touched.name = true;
  validateName(true);
  checkFormValidity();
});

nameInput.addEventListener('blur', () => {
  touched.name = true;
  validateName(true);
  checkFormValidity();
});

// Email listeners
emailInput.addEventListener('input', () => {
  touched.email = true;
  validateEmail(true);
  checkFormValidity();
});

emailInput.addEventListener('blur', () => {
  touched.email = true;
  validateEmail(true);
  checkFormValidity();
});

// Password listeners
passwordInput.addEventListener('input', () => {
  touched.password = true;
  validatePassword(true);
  checkFormValidity();
});

passwordInput.addEventListener('blur', () => {
  touched.password = true;
  validatePassword(true);
  checkFormValidity();
});

// Password visibility toggle
togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.getAttribute('type') === 'password';
  passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
});

// Form Submission handling
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Mark all fields as touched
  touched.name = true;
  touched.email = true;
  touched.password = true;

  const isNameValid = validateName(true);
  const isEmailValid = validateEmail(true);
  const isPasswordValid = validatePassword(true);

  if (isNameValid && isEmailValid && isPasswordValid) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Simulate async submission
    setTimeout(() => {
      submitBtn.textContent = 'Register';
      successMessage.style.display = 'block';

      // Reset form
      form.reset();
      clearValidationState(groupName, nameError);
      clearValidationState(groupEmail, emailError);
      clearValidationState(groupPassword, passwordError);

      touched.name = false;
      touched.email = false;
      touched.password = false;

      checkFormValidity();

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 4000);
    }, 700);
  } else {
    checkFormValidity();
  }
});

// Initial validation state on page load
checkFormValidity();
