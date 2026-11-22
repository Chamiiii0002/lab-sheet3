// ===== Data =====
const takenUsernames = ["admin", "nimali", "kavin"];                     // pretend the server sent these

// ===== Page elements =====
const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmBox = document.getElementById("confirm");
const terms = document.getElementById("terms");
const showBtn = document.getElementById("show-btn");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");
const strengthEl = document.getElementById("pw-strength");   // Challenge: strength word
const resetBtn = document.getElementById("reset-btn");       // Challenge: Start again
const ruleItems = {
  length: document.getElementById("rule-length"),
  number: document.getElementById("rule-number"),
  upper: document.getElementById("rule-upper"),
  symbol: document.getElementById("rule-symbol")
};

function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
}

// TODO 1: username rules
function checkUsername(value) {
  if (!/^\w{3,15}$/.test(value)) return "Use 3 to 15 letters, numbers or _.";
  if (takenUsernames.includes(value.toLowerCase())) return "That username is taken. Try another.";
  return "";
}

// TODO 2: email rule
function checkEmail(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter an email like name@example.com.";
  return "";
}

// TODO 3: password rules checklist
function checkPasswordRules(value) {
  const results = {
    length: value.length >= 8,
    number: /\d/.test(value),
    upper: /[A-Z]/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value)
  };
  for (const rule in results) {
    ruleItems[rule].classList.toggle("met", results[rule]);
  }
  // Challenge 1: strength word (Weak 0-2, Fair 3, Strong 4)
  const score = Object.values(results).filter(Boolean).length;
  strengthEl.textContent = value === "" ? "" :
    `Strength: ${score === 4 ? "Strong" : score === 3 ? "Fair" : "Weak"}`;
  return score === 4;
}

// TODO 4: confirm password
function checkConfirm() {
  if (confirmBox.value === "") return "Please type your password again.";
  if (confirmBox.value !== password.value) return "Passwords do not match.";
  return "";
}

function updateForm() {
  if (username.value !== "") showError(username, checkUsername(username.value));
  if (email.value !== "") showError(email, checkEmail(email.value));
  if (confirmBox.value !== "") showError(confirmBox, checkConfirm());
  const pwOk = checkPasswordRules(password.value);
  const allOk = checkUsername(username.value) === "" &&
                checkEmail(email.value) === "" &&
                pwOk && checkConfirm() === "" && terms.checked;
  submitBtn.disabled = !allOk;
}

[username, email, password, confirmBox, terms].forEach((el) => {
  el.addEventListener("input", updateForm);
});

// TODO 5: Show / Hide password
showBtn.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  showBtn.textContent = hidden ? "Hide" : "Show";
});

// Challenge 2: Start again clears the form, every error and every ticked rule
resetBtn.addEventListener("click", () => {
  form.reset();
  [username, email, confirmBox].forEach((input) => showError(input, ""));
  password.type = "password";
  showBtn.textContent = "Show";
  result.textContent = "";
  form.hidden = false;
  updateForm();                       // un-ticks the rules and disables the button
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateForm();
  if (submitBtn.disabled) return;
  result.textContent = `Welcome, ${username.value.trim()}! Your account is ready.`;
  form.hidden = true;
  form.reset();
  updateForm();
  strengthEl.textContent = "";
});
