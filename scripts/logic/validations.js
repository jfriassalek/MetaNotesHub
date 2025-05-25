// logic/validations.js

export function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);

  input.classList.add("error");
  errorSpan.textContent = message;
}

export function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);

  input.classList.remove("error");
  errorSpan.textContent = "";
}

export function setupFieldValidations() {
  const terminalDropInput = document.getElementById("terminal-drop");
  const houseDropInput = document.getElementById("house-drop");
  const boreLengthInput = document.getElementById("bore-length");
  const contactTimeInput = document.getElementById("contact-time");

  terminalDropInput.addEventListener("blur", validateDropOnBlur);
  houseDropInput.addEventListener("blur", validateDropOnBlur);
  boreLengthInput.addEventListener("blur", validateBoreLength);
  contactTimeInput.addEventListener("blur", validateContactTime);

  function validateDropOnBlur(event) {
    const field = event.target;
    const fieldId = field.id;
    const value = parseInt(field.value, 10);

    clearError(fieldId);

    if (!isNaN(value) && value % 3 !== 0) {
      showError(fieldId, "Ivalid value.");
      return;
    }

    const terminalVal = parseInt(terminalDropInput.value, 10);
    const houseVal = parseInt(houseDropInput.value, 10);

    if (
      fieldId === "house-drop" &&
      !isNaN(terminalVal) &&
      !isNaN(houseVal) &&
      terminalVal < houseVal
    ) {
      showError("house-drop", "Invalid value.");
    }
  }

  function validateBoreLength(e) {
    const val = e.target.value.trim();
    clearError("bore-length");

    if (val === "" || isNaN(parseInt(val, 10))) {
      showError("bore-length", "This field is required.");
    }
  }

  function validateContactTime(e) {
    const val = parseInt(e.target.value, 10);
    clearError("contact-time");

    if (isNaN(val) || val < 0 || val > 2359) {
      showError("contact-time", "Enter a valid time in hhmm (24h) format.");
    }
  }
}
