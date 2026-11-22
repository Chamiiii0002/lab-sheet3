// ===== Part B: Validation =====
const form = document.getElementById("reg-form");
const statusMsg = document.getElementById("status");

// Task B2: one validation function per field (return "" when valid)
function validateName(value) {
  if (value.trim() === "") return "Please enter your full name.";
  if (value.trim().length < 3) return "Your name must be at least 3 characters.";
  return "";
}

function validateStudentId(value) {
  if (!/^HD\d-\d{3}$/.test(value)) return "Use the format HD3-017.";
  return "";
}

function validateEmail(value) {
  if (value.trim() === "") return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter an email like name@example.com.";
  return "";
}

function validatePhone(value) {
  if (!/^07\d{8}$/.test(value)) return "Enter 10 digits starting with 07, e.g. 0771234567.";
  return "";
}

function validateWorkshop(value) {
  if (value === "") return "Please choose a workshop.";
  return "";
}

function validateGuests(value) {
  const n = Number(value);
  if (value.trim() === "" || !Number.isInteger(n) || n < 0 || n > 3) {
    return "Guests must be a whole number from 0 to 3.";
  }
  return "";
}

function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;                  // "" clears it
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
}

const rules = {
  "full-name": validateName,
  "student-id": validateStudentId,
  "email": validateEmail,
  "phone": validatePhone,
  "workshop": validateWorkshop,
  "guests": validateGuests
};

function checkField(input) {
  const message = rules[input.id](input.value);
  showError(input, message);
  return message === "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstBad = null;
  for (const id in rules) {
    const input = document.getElementById(id);
    if (!checkField(input) && firstBad === null) firstBad = input;
  }
  if (firstBad) {
    firstBad.focus();             // take the user to the first problem
    statusMsg.textContent = "Please fix the errors shown in red.";
    return;
  }
  statusMsg.textContent = "Registration complete!";
  form.reset();
});
