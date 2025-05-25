export function setupNdiDetails() {
  const ndiCheckbox = document.getElementById("NDI");
  const ndiSection = document.getElementById("ndi-section");
  const ontLight = document.getElementById("ont-light");
  const terminalLight = document.getElementById("terminal-light");

  if (!ndiCheckbox || !ndiSection) return;

  // Initialize NDI section visibility based on checkbox state
  ndiCheckbox.addEventListener("change", () => {
    ndiSection.classList.toggle("hidden", !ndiCheckbox.checked);
  });

  // Set initial visibility
  [ontLight, terminalLight].forEach((input) => {
    input.addEventListener("input", () => {
      const val = input.value.replace(/[^0-9]/g, "").slice(0, 2);
      input.value = val ? `-${val}` : "";
    });
  });
}
