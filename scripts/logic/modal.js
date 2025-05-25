// logic/modal.js

export function setupModal() {
  const codeTableModal = document.getElementById("code-table-modal");
  const codeTableBtn = document.getElementById("code-table-btn");
  const closeModalBtn = document.getElementById("close-modal");

  codeTableBtn.addEventListener("click", () => {
    codeTableModal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    codeTableModal.classList.add("hidden");
  });

  codeTableModal.addEventListener("click", (e) => {
    if (e.target === codeTableModal) {
      codeTableModal.classList.add("hidden");
    }
  });
}
