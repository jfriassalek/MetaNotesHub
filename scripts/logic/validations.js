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

  contactTimeInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  terminalDropInput.addEventListener("blur", validateDropOnBlur);
  houseDropInput.addEventListener("blur", validateDropOnBlur);
  boreLengthInput.addEventListener("blur", validateBoreLength);
  contactTimeInput.addEventListener("blur", validateContactTime);

  function validateDropOnBlur(event) {
    const field = event.target;
    const fieldId = field.id;
    const value = parseInt(field.value, 10);

    clearError(fieldId);

    if (!isNaN(value) && value % 3 !== 0 && value % 2 !== 0) {
      showError(fieldId, "Invalid value.");
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
    const input = e.target;
    let digits = input.value.replace(/[^0-9]/g, "");
    clearError("contact-time");

    if (digits.length === 4) {
      const hours = parseInt(digits.slice(0, 2), 10);
      const minutes = parseInt(digits.slice(2), 10);

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        input.value = `${digits.slice(0, 2).padStart(2, "0")}:${digits
          .slice(2)
          .padStart(2, "0")}`;
      } else {
        showError(
          "contact-time",
          "Invalid time. Must be between 00:00 and 23:59."
        );
      }
    } else if (digits.length === 3) {
      const hours = parseInt(digits.charAt(0), 10);
      const minutes = parseInt(digits.slice(1), 10);

      if (hours >= 0 && hours <= 9 && minutes >= 0 && minutes <= 59) {
        input.value = `0${digits.charAt(0)}:${digits
          .slice(1)
          .padStart(2, "0")}`;
      } else {
        showError(
          "contact-time",
          "Invalid time. Must be between 00:00 and 23:59."
        );
      }
    } else if (digits.length > 0) {
      showError("contact-time", "Enter 3 or 4 digits (e.g., 800 or 1230).");
    }
  }
}
