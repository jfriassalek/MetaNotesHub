export function setupResetForm() {
  const resetButton = document.getElementById("reset-form");
  const form = document.querySelector("form");
  const output = document.getElementById("note-output");

  if (!resetButton || !form) return;

  resetButton.addEventListener("click", () => {
    form.reset(); // esto resetea todos los inputs, selects y radios automáticamente

    // Limpia todos los checkboxes manualmente (por si alguno no vuelve solo)
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => (cb.checked = false));

    // Limpia el resultado generado
    if (output) output.textContent = "";
  });
}
