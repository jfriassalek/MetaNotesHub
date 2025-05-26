// logic/workCodes.js

const quantityCodes = ["BXT", "WF"];

export function setupWorkCodes() {
  quantityCodes.forEach((code) => {
    const checkbox = document.getElementById(code);
    if (!checkbox) return;

    checkbox.addEventListener("change", () => {
      handleQuantityCheckboxChange(checkbox);
      updateExtenders(); // force update on toggle
    });

    const input = checkbox.parentElement.querySelector(`input[type="number"]`);
    if (input) {
      input.addEventListener("input", enforceQuantityLimits);
    }
  });

  // === NDI - 2SNI ===
  const codes = ["NDI", "2SNI", "MDU1", "MDU2", "NTI"];
  const checkboxes = codes
    .map((code) => document.getElementById(code))
    .filter(Boolean);

  checkboxes.forEach((current) => {
    current.addEventListener("change", () => {
      if (current.checked) {
        checkboxes.forEach((other) => {
          if (other !== current) other.checked = false;
        });
      }
      updateExtenders();
    });
  });

  setupExtenderLocations();
}

// === Extender Location ===
let updateExtenders; // forward declaration

function setupExtenderLocations() {
  const extenderCodes = ["NDI", "2SNI", "MDU1", "MDU2", "NTI"];
  const extenderCheckboxes = extenderCodes
    .map((code) => document.getElementById(code))
    .filter(Boolean);
  const bxtCheckbox = document.getElementById("BXT");
  const bxtInput =
    bxtCheckbox?.parentElement.querySelector(`input[type="number"]`);

  const extenderContainer = document.getElementById(
    "extender-location-container"
  );
  const soloBxtContainer = document.getElementById(
    "solo-bxt-location-container"
  );
  const soloBxtSection = document.getElementById("solo-bxt-section");

  // Render extender fields depending on selected codes
  updateExtenders = function () {
    extenderContainer.innerHTML = "";
    soloBxtContainer.innerHTML = "";

    extenderContainer.classList.add("hidden");
    soloBxtSection.classList.add("hidden");

    const count = parseInt(bxtInput?.value, 10);
    const extenderSelected = extenderCheckboxes.some((cb) => cb.checked);
    const show = bxtCheckbox.checked && count > 0;

    if (!show) return;

    const target = extenderSelected ? extenderContainer : soloBxtContainer;
    const targetSection = extenderSelected ? extenderContainer : soloBxtSection;
    targetSection.classList.remove("hidden");

    for (let i = 1; i <= count; i++) {
      target.appendChild(createLabeledInput(`Extender Location ${i}:`));
    }
  };

  extenderCheckboxes.forEach((cb) =>
    cb.addEventListener("change", updateExtenders)
  );
  bxtCheckbox.addEventListener("change", updateExtenders);
  bxtInput.addEventListener("input", updateExtenders);

  updateExtenders();
}

// Enable or disable quantity inputs and trigger UI update
function handleQuantityCheckboxChange(checkbox) {
  const input = checkbox.parentElement.querySelector(`input[type="number"]`);
  if (!input) return;

  if (checkbox.checked) {
    input.disabled = false;
    input.value = 1;
  } else {
    input.disabled = true;
    input.value = 0;
  }

  // trigger UI update immediately
  updateExtenders();
}

function enforceQuantityLimits(event) {
  const input = event.target;
  let value = parseInt(input.value, 10);
  if (isNaN(value)) return;

  if (value < 1) input.value = 1;
  if (value > 10) input.value = 10;

  updateExtenders(); // force refresh
}

function createLabeledInput(labelText) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("bore-inline");

  const label = document.createElement("label");
  label.classList.add("bore-label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("bore-input");

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}
