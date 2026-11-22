console.log("Forms lab ready");

// Task A1: the submit event
const form = document.getElementById("reg-form");
const statusMsg = document.getElementById("status");
const summary = document.getElementById("summary");

form.addEventListener("submit", (e) => {
  e.preventDefault();             // stay on this page
  console.log("Form submitted");

  // Task A2: reading values
  const name = document.getElementById("full-name").value.trim();   // string, spaces removed
  const workshopSelect = document.getElementById("workshop");
  const workshopText = workshopSelect.options[workshopSelect.selectedIndex].text;
  const session = document.querySelector('input[name="session"]:checked').value;
  const guests = Number(document.getElementById("guests").value);   // string -> number
  const laptop = document.getElementById("laptop").checked;         // true / false

  // Task A3: registration summary
  console.log(Object.fromEntries(new FormData(form)));   // what would be sent

  summary.textContent = "";                              // clear old summary
  const h2 = document.createElement("h2");
  h2.textContent = "Registration received";
  const ul = document.createElement("ul");

  const items = [
    `Name: ${name}`,
    `Workshop: ${workshopText}`,
    `Session: ${session}`,
    `Guests: ${guests}`,
    `Own laptop: ${laptop ? "Yes" : "No"}`
  ];
  for (const text of items) {
    const li = document.createElement("li");
    li.textContent = text;          // textContent: safe for user-typed values
    ul.appendChild(li);
  }
  summary.append(h2, ul);

  statusMsg.textContent = `Thank you, ${name}!`;
  form.reset();
});
