// Contact form validation - vanilla JS + Regex
// Each field has its own regex pattern. The submit button stays
// disabled until all three fields match their pattern.

const form = document.querySelector('#contact-form');
const submitBtn = document.querySelector('#submit-btn');
const successMsg = document.querySelector('#success');

// One object per field: the input, its error <p>, its pattern, its message.
const fields = {
  name: {
    input: document.querySelector('#name'),
    error: document.querySelector('#name-error'),
    // letters, spaces, hyphens and apostrophes, at least 2 characters
    pattern: /^[A-Za-z\s'-]{2,}$/,
    message: 'Enter your name (letters only, at least 2 characters).',
  },
  email: {
    input: document.querySelector('#email'),
    error: document.querySelector('#email-error'),
    // text, then @, then text, then a dot, then text - no spaces allowed
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address (e.g. name@example.com).',
  },
  message: {
    input: document.querySelector('#message'),
    error: document.querySelector('#message-error'),
    // any characters (including line breaks), at least 10 of them
    pattern: /^[\s\S]{10,}$/,
    message: 'Message must be at least 10 characters.',
  },
};

// Does this one field match its pattern?
function fieldValid(field) {
  return field.pattern.test(field.input.value);
}

// Show or clear the error text for one field.
function showFieldError(field) {
  field.error.textContent = fieldValid(field) ? '' : field.message;
}

// Enable the button only when every field is valid.
function updateButton() {
  let allValid = true;
  for (const key in fields) {
    if (!fieldValid(fields[key])) {
      allValid = false;
    }
  }
  submitBtn.disabled = !allValid;
}

// As the user types in a field, check that field and update the button.
for (const key in fields) {
  fields[key].input.addEventListener('input', function () {
    showFieldError(fields[key]);
    updateButton();
  });
}

// On submit: stop the real send (static site, no server), show any errors,
// and only confirm when all fields pass.
form.addEventListener('submit', function (event) {
  event.preventDefault();

  let allValid = true;
  for (const key in fields) {
    showFieldError(fields[key]);
    if (!fieldValid(fields[key])) {
      allValid = false;
    }
  }

  if (allValid) {
    successMsg.textContent = 'Thanks! Your message passed validation.';
    form.reset();
    submitBtn.disabled = true;
  }
});