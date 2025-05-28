// main.js
document.getElementById("generate-note").addEventListener("click", () => {
  const codes = setupGenerateNote();
  console.log("Generated codes:", codes); // o mostrarlos en el DOM
});

import { setupDropInfo } from "./logic/dropInfo.js";
import { setupModal } from "./logic/modal.js";
//import { setupServiceType } from "./logic/serviceType.js";
import { setupFieldValidations } from "./logic/validations.js";
import { setupWorkCodes } from "./logic/workCodes.js";
import { setupNdiDetails } from "./logic/ndiDetails.js";
import { setupGenerateNote } from "./logic/noteGenerator.js";
import { setupResetForm } from "./logic/resetForm.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDropInfo();
  setupModal();
  //setupServiceType();
  setupFieldValidations();
  setupWorkCodes();
  setupNdiDetails();
  setupGenerateNote();
  setupResetForm();
});
