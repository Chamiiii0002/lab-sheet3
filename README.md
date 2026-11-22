# form-lab

HDIT 12103 · Lab Sheet 03 · Interactive Forms and Client-side Validation

- `index.html` + `js/part-a.js` (tasks A1–A3) and `js/part-b.js` (tasks B2–B4): workshop registration form
- `signup.html` + `js/signup.js`: Part C sign-up form with password checklist
- Challenges completed: **B3.2** (valid fields in green) and **Task C** (strength word, Start again button)

Run with VS Code Live Server. `index.html` loads `part-b.js` (it includes the validation); `part-a.js` is the Part A version.

## Written answers

**A1.** With no JavaScript the address bar shows `?fullName=...&studentId=...&email=...&phone=...&workshop=...&session=morning&guests=0`. The checkbox is missing when unticked: unchecked checkboxes are never sent. (Fields without a `name` are never sent either.)
Pressing Enter in a text box does submit the form.

**A2.** `value` is always a string, so `"2" + 1` gives `"21"`; `Number("2") + 1` gives `3`. `checked` gives `true`/`false`. The select's `value` (`js`) comes from the `<option value="js">`; the words "JavaScript games" are the option's text.

**B1.** `Ab` → "Please lengthen this text". Empty ID → "Please fill out this field". `nimali@icst` → accepted. `12345` → "Please match the requested format". Guests `5` → "Value must be less than or equal to 3". The browser accepts `nimali@icst` because it has an `@`, but it has no real domain, so mail to it would bounce and the campus list would hold bad addresses.

**B2.1.** Results: 1 true, 2 false, 3 false, 4 false, 5 true, 6 false, 7 false, 8 true, 9 false, 10 false. Without `^` and `$` row 4 becomes true: the pattern then matches 10 digits anywhere inside the text, so extra characters are no longer rejected.

**B4.** The whole form can be completed with the keyboard. After a wrong phone number, focus jumps to the phone box, so a keyboard or screen-reader user lands directly on the first problem without hunting for it.

**B5.** No, the invalid email was not checked: `form.submit()` does not fire the `submit` event, so our validation listener never ran (the data is sent as is). Other ways round client-side checks: editing the HTML in DevTools, disabling JavaScript, or sending a request directly with a tool like curl.

## Self-check answers

1. `submit` also fires when the user presses Enter in a text box; a button `click` would miss that.
2. It stops the browser's default action (sending the data and loading a new page) so JavaScript can handle the form.
3. A string, even for `type="number"`. Convert with `Number(input.value)`.
4. `document.querySelector('input[name="session"]:checked').value`.
5. `required` (not empty), `minlength` (text length), `pattern` (matches a regular expression). Also `min`/`max` for number range and `type` for format.
6. `^` is the start and `$` the end of the text, so the whole value must match. Without them any text that merely contains a match passes.
7. Checking on blur avoids showing errors before the user has finished typing; after that, `input` checks make the error vanish as soon as it is fixed.
8. Link each message to its field with `aria-describedby`, and mark fields with `aria-invalid`; also use `role="status"` and put the cursor on the first error.
9. The user controls the browser and can bypass or edit the checks, so the server must validate every value again.
10. Any script on the page can read `localStorage`, so a stored password could be stolen.
