// main.js

import { setupDropInfo } from "./logic/dropInfo.js";
import { setupModal } from "./logic/modal.js";
import { setupServiceType } from "./logic/serviceType.js";
import { setupFieldValidations } from "./logic/validations.js";
import { setupWorkCodes } from "./logic/workCodes.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDropInfo();
  setupModal();
  setupServiceType();
  setupFieldValidations();
  setupWorkCodes();
});
