const quantityCodes = ["BXT", "TBXT", "WF"];

export function setupWorkCodes() {
  quantityCodes.forEach((code) => {
    const checkbox = document.getElementById(code);
    if (!checkbox) return;

    checkbox.addEventListener("change", () =>
      handleQuantityCheckboxChange(checkbox)
    );

    const input = checkbox.parentElement.querySelector(`input[type="number"]`);
    if (input) {
      input.addEventListener("input", enforceQuantityLimits);
    }
  });

  setupExtenderLocations();
  setupTbxtLocations();
}

// === Extender Location (NDI + BXT) ===
function setupExtenderLocations() {
  const ndiCheckbox = document.getElementById("NDI");
  const bxtCheckbox = document.getElementById("BXT");
  const bxtInput =
    bxtCheckbox?.parentElement.querySelector(`input[type="number"]`);
  const extenderContainer = document.getElementById(
    "extender-location-container"
  );

  function updateExtenders() {
    extenderContainer.innerHTML = "";

    const count = parseInt(bxtInput.value, 10);
    const show = ndiCheckbox.checked && bxtCheckbox.checked && count > 0;

    extenderContainer.classList.toggle("hidden", !show);
    if (!show) return;

    for (let i = 1; i <= count; i++) {
      extenderContainer.appendChild(
        createLabeledInput(`Extender Location ${i}:`)
      );
    }
  }

  ndiCheckbox.addEventListener("change", updateExtenders);
  bxtCheckbox.addEventListener("change", updateExtenders);
  bxtInput.addEventListener("input", updateExtenders);
}

// === TBXT Dynamic Inputs ===
function setupTbxtLocations() {
  const tbxtCheckbox = document.getElementById("TBXT");
  const tbxtInput =
    tbxtCheckbox?.parentElement.querySelector(`input[type="number"]`);
  const tbxtContainer = document.getElementById("tbxt-location-container");
  const tbxtSection = document.getElementById("tbxt-section");

  function updateTbxt() {
    tbxtContainer.innerHTML = "";

    const count = parseInt(tbxtInput.value, 10);
    const show = tbxtCheckbox.checked && count > 0;

    tbxtSection.classList.toggle("hidden", !show);
    if (!show) return;

    for (let i = 1; i <= count; i++) {
      tbxtContainer.appendChild(createLabeledInput(`TBXT Location ${i}:`));
    }
  }

  tbxtCheckbox.addEventListener("change", updateTbxt);
  tbxtInput.addEventListener("input", updateTbxt);
}

// === Shared Utility ===
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
}

function enforceQuantityLimits(event) {
  const input = event.target;
  let value = parseInt(input.value, 10);
  if (isNaN(value)) return;

  if (value < 1) input.value = 1;
  if (value > 10) input.value = 10;
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
