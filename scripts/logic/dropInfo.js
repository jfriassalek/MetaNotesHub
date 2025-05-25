// logic/dropInfo.js

import { showError, clearError } from "./validations.js";

export function setupDropInfo() {
  const terminalDropInput = document.getElementById("terminal-drop");
  const houseDropInput = document.getElementById("house-drop");
  const boreRequiredRadios = document.getElementsByName("bore-required");
  const dropTypeSelect = document.getElementById("drop-type");

  terminalDropInput.addEventListener("input", () => {
    updateDropExtras();
    handleBoreVisibility();
  });

  terminalDropInput.addEventListener("blur", validateDrop);
  houseDropInput.addEventListener("blur", validateDrop);
  dropTypeSelect.addEventListener("change", updateDropExtras);

  boreRequiredRadios.forEach((r) =>
    r.addEventListener("change", handleBoreRequiredChange)
  );
}

function validateDrop(event) {
  const field = event.target;
  const fieldId = field.id;
  const value = parseInt(field.value, 10);
  const terminalVal = parseInt(
    document.getElementById("terminal-drop").value,
    10
  );
  const houseVal = parseInt(document.getElementById("house-drop").value, 10);

  clearError(fieldId);

  if (!isNaN(value) && value % 3 !== 0) {
    showError(fieldId, "Invalid value.");
    return;
  }

  if (
    fieldId === "house-drop" &&
    !isNaN(terminalVal) &&
    !isNaN(houseVal) &&
    terminalVal < houseVal
  ) {
    showError(fieldId, "Invalid value.");
  }
}

function updateDropExtras() {
  const terminalVal = parseInt(
    document.getElementById("terminal-drop").value,
    10
  );
  const dropExtraContainer = document.getElementById("drop-extra-container");
  const dropLocationLabel = document.getElementById("drop-location-label");
  const dropTypeSelect = document.getElementById("drop-type");

  if (!isNaN(terminalVal) && terminalVal > 0) {
    dropExtraContainer.classList.remove("hidden");
  } else {
    dropExtraContainer.classList.add("hidden");
  }

  const type = dropTypeSelect.value;
  dropLocationLabel.textContent =
    type === "aerial" ? "Pole location:" : "Flowerpot location:";
}

function handleBoreVisibility() {
  const terminalVal = parseInt(
    document.getElementById("terminal-drop").value,
    10
  );
  const boreContainer = document.getElementById("bore-required-container");
  const boreTypeContainer = document.getElementById("bore-type-container");

  if (!isNaN(terminalVal) && terminalVal > 0) {
    boreContainer.classList.remove("hidden");
  } else {
    boreContainer.classList.add("hidden");
    boreTypeContainer.classList.add("hidden");
  }
}

function handleBoreRequiredChange() {
  const selected = [...document.getElementsByName("bore-required")].find(
    (r) => r.checked
  )?.value;
  const boreTypeContainer = document.getElementById("bore-type-container");
  const boreLengthContainer = document.getElementById("bore-length-container");

  if (selected === "yes") {
    boreTypeContainer.classList.remove("hidden");
    boreLengthContainer.classList.remove("hidden");
  } else {
    boreTypeContainer.classList.add("hidden");
    boreLengthContainer.classList.add("hidden");
  }
}
