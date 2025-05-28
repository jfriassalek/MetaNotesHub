// logic/noteGenerator.js

// Función que genera los códigos en base a los checkboxes y la longitud del drop
export function generateNote() {
  const selectedCodes = Array.from(
    document.querySelectorAll('input[name="codes"]:checked')
  ).map((input) => input.value);

  const terminalVal = parseInt(
    document.getElementById("terminal-drop").value,
    10
  );
  const houseVal = parseInt(document.getElementById("house-drop").value, 10);
  const dropLength = terminalVal - houseVal;

  let dropCode = "";
  if (!isNaN(dropLength)) {
    if (dropLength <= 200) dropCode = "D1";
    else if (dropLength <= 400) dropCode = "D2";
    else if (dropLength <= 600) dropCode = "D3";
    else if (dropLength <= 800) dropCode = "D4";
    else if (dropLength <= 1000) dropCode = "D5";
    else if (dropLength <= 1200) dropCode = "D6";
    else if (dropLength <= 1400) dropCode = "D7";
    else if (dropLength <= 1600) dropCode = "D8";
    else if (dropLength <= 1800) dropCode = "D9";
    else if (dropLength <= 2000) dropCode = "D10";
    else if (dropLength <= 2200) dropCode = "D11";
    else if (dropLength <= 2400) dropCode = "D12";
    else if (dropLength <= 2600) dropCode = "D13";
    else if (dropLength <= 2800) dropCode = "D14";
    else dropCode = "D15";

    selectedCodes.push(dropCode);
  }

  return selectedCodes;
}

// Función que se encarga de conectar el botón al proceso de generación de nota
export function setupGenerateNote() {
  const button = document.getElementById("generate-note");
  const output = document.getElementById("note-output");

  if (!button || !output) return;

  button.addEventListener("click", () => {
    const codes = generateNote();
    //console.log("Generated codes:", codes);
    output.textContent = codes.join("\n");
  });
}
