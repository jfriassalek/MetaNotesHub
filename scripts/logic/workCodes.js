// logic/workCodes.js

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
}

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
  const value = parseInt(input.value, 10);

  if (value < 1) input.value = 1;
  if (value > 10) input.value = 10;
}
