export function setupNdiDetails() {
  const ndiCheckbox = document.getElementById("NDI");
  const sniCheckbox = document.getElementById("2SNI");
  const mdu1Checkbox = document.getElementById("MDU1");
  const mdu2Checkbox = document.getElementById("MDU2");
  const ntiCheckbox = document.getElementById("NTI");
  const ndiSection = document.getElementById("ndi-section");
  const ontLight = document.getElementById("ont-light");
  const terminalLight = document.getElementById("terminal-light");

  if (
    !ndiCheckbox ||
    !sniCheckbox ||
    !mdu1Checkbox ||
    !mdu2Checkbox ||
    !ntiCheckbox ||
    !ndiSection
  )
    return;

  function updateSectionVisibility() {
    const show =
      ndiCheckbox.checked ||
      sniCheckbox.checked ||
      mdu1Checkbox.checked ||
      mdu2Checkbox.checked ||
      ntiCheckbox.checked;
    ndiSection.classList.toggle("hidden", !show);
  }

  [ndiCheckbox, sniCheckbox, mdu1Checkbox, mdu2Checkbox, ntiCheckbox].forEach(
    (cb) => {
      cb.addEventListener("change", updateSectionVisibility);
    }
  );

  updateSectionVisibility(); // Initial visibility

  [ontLight, terminalLight].forEach((input) => {
    input.addEventListener("input", () => {
      const val = input.value.replace(/[^0-9]/g, "").slice(0, 2);
      input.value = val ? `-${val}` : "";
    });
  });
}
