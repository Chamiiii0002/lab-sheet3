console.log("Forms lab ready");

// Task A1: the submit event
const form = document.getElementById("reg-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();             // stay on this page
  console.log("Form submitted");
});
