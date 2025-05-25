//// logic/serviceType.js

//const restrictedCodesForInternetInstallation = [
//  "TU",
//  "DU",
//  "DG",
//  "ER",
//  "OR",
//  "OS",
//  "TC",
//  "TBXT",
//];

//export function setupServiceType() {
//  const serviceTypeSelect = document.getElementById("service-type");
//  if (!serviceTypeSelect) return;

//  serviceTypeSelect.addEventListener("change", handleServiceTypeChange);
//  handleServiceTypeChange(); // Run on load
//}

//function handleServiceTypeChange() {
//  const serviceType = document.getElementById("service-type").value;

//  restrictedCodesForInternetInstallation.forEach((codeId) => {
//    const checkbox = document.getElementById(codeId);
//    if (!checkbox) return;

//    checkbox.disabled = serviceType === "internet-installation";
//    if (checkbox.disabled) checkbox.checked = false;
//  });
//}
